import { ensureMethod, sendError } from "../_lib/http.js";
import { verifyJWT } from "../../src/util.js";
import { tbl } from "../../src/airtable.js";

function extractToken(req) {
  const header = req.headers?.authorization || req.headers?.Authorization;
  if (!header || typeof header !== "string") {
    return null;
  }
  const parts = header.split(" ");
  if (parts.length !== 2) return null;
  const [scheme, token] = parts;
  if (scheme !== "Bearer" || !token) {
    return null;
  }
  return token;
}

function sanitizeFolder(record) {
  const fields = record?.fields ?? {};
  const parentField = fields.parent || fields.parent_folder || fields.folder_parent;
  const parentId = Array.isArray(parentField) && parentField.length > 0 ? parentField[0] : null;
  const rawOrder = fields.order ?? fields.sort_order;
  const parsedOrder = Number(rawOrder);

  return {
    id: record.id,
    name: fields.name ?? fields.title ?? "",
    slug: fields.slug ?? fields.identifier ?? null,
    parent: typeof parentId === "string" ? parentId : null,
    order: Number.isFinite(parsedOrder) ? parsedOrder : 999,
  };
}

function sanitizeFile(record) {
  const fields = record?.fields ?? {};
  const folderField = fields.folder || fields.folders || fields.parent_folder;
  const folderId = Array.isArray(folderField) && folderField.length > 0 ? folderField[0] : null;
  const rawOrder = fields.order ?? fields.sort_order;
  const parsedOrder = Number(rawOrder);

  const file = {
    id: record.id,
    title: fields.title ?? fields.name ?? "",
    type: fields.type ?? fields.format ?? "",
    url: fields.url ?? fields.link ?? fields.href ?? null,
    folder: typeof folderId === "string" ? folderId : null,
  };

  if (Number.isFinite(parsedOrder)) {
    file.order = parsedOrder;
  }

  const rawSize = fields.size ?? fields.file_size ?? null;
  const parsedSize = Number(rawSize);
  if (Number.isFinite(parsedSize) && parsedSize > 0) {
    file.size = parsedSize;
  }

  return file;
}

function extractFolderId(record) {
  const fields = record?.fields ?? {};
  const folderField = fields.folder || fields.folders || fields.parent_folder;
  if (Array.isArray(folderField) && folderField.length > 0) {
    const [value] = folderField;
    return typeof value === "string" ? value : null;
  }
  return null;
}

export default async function handler(req, res) {
  if (!ensureMethod(req, res, "GET")) return;

  const token = extractToken(req);
  if (!token) {
    return sendError(res, 401, "Token non fornito");
  }

  let payload;
  try {
    payload = verifyJWT(token);
  } catch (error) {
    console.error("Invalid JWT for content tree", error);
    return sendError(res, 401, "Sessione non valida");
  }

  if (payload?.role !== "student") {
    return sendError(res, 403, "Accesso negato");
  }

  try {
    const folderRecords = await tbl.FOLDERS.select({
      filterByFormula: '{visibility} = "student"',
      sort: [{ field: "order", direction: "asc" }],
      fields: ["name", "slug", "visibility", "parent", "order"],
    }).all();

    const folders = folderRecords
      .map(sanitizeFolder)
      .sort((a, b) => {
        const orderDiff = (a.order ?? 999) - (b.order ?? 999);
        if (orderDiff !== 0) return orderDiff;
        return (a.name || "").localeCompare(b.name || "");
      });
    const folderIds = folders.map((folder) => folder.id);
    const folderIdSet = new Set(folderIds);

    let files = [];
    if (folderIdSet.size > 0) {
      const fileFilterFormula = `OR(${folderIds
        .map((id) => `FIND('${id}', ARRAYJOIN({folder}))`)
        .join(",")})`;

      const fileRecords = await tbl.FILES.select({
        filterByFormula: fileFilterFormula,
        fields: ["title", "type", "url", "size", "folder"],
      }).all();

      files = fileRecords
        .map((record) => ({
          record,
          folderId: extractFolderId(record),
        }))
        .filter(({ folderId }) => folderId && folderIdSet.has(folderId))
        .map(({ record }) => sanitizeFile(record))
        .sort((a, b) => {
          const orderDiff = (a.order ?? 999) - (b.order ?? 999);
          if (orderDiff !== 0) return orderDiff;
          return (a.title || "").localeCompare(b.title || "");
        })
        .map((file) => {
          if ("order" in file) {
            const { order, ...rest } = file;
            return rest;
          }
          return file;
        });
    }

    console.log("student tree folders", folders.length);
    console.log("student tree files", files.length);

    res.status(200).json({ folders, files });
  } catch (error) {
    console.error("student tree error", error);
    return res.status(500).json({ error: "Errore nel recupero dei contenuti" });
  }
}
