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
  const orderValue = typeof fields.order === "number" ? fields.order : Number(fields.order);

  return {
    id: record.id,
    name: fields.name ?? fields.title ?? "",
    slug: fields.slug ?? fields.identifier ?? null,
    order: Number.isFinite(orderValue) ? orderValue : 0,
    parent: typeof parentId === "string" ? parentId : null,
    description: fields.description ?? null,
  };
}

function sanitizeFile(record) {
  const fields = record?.fields ?? {};
  const folderField = fields.folder || fields.folders || fields.parent_folder;
  const folderId = Array.isArray(folderField) && folderField.length > 0 ? folderField[0] : null;
  const orderValue = typeof fields.order === "number" ? fields.order : Number(fields.order);
  return {
    id: record.id,
    name: fields.name ?? fields.title ?? "",
    slug: fields.slug ?? null,
    type: fields.type ?? fields.format ?? null,
    url: fields.url ?? fields.link ?? fields.href ?? null,
    folder: typeof folderId === "string" ? folderId : null,
    description: fields.description ?? null,
    order: Number.isFinite(orderValue) ? orderValue : 0,
  };
}

function filterFileBySchool(record, schoolId) {
  const fields = record?.fields ?? {};
  const schoolField = fields.school || fields.schools;
  const schoolList = Array.isArray(schoolField) ? schoolField : [];

  if (schoolList.length === 0) {
    return true;
  }

  if (!schoolId) {
    return false;
  }

  return schoolList.includes(schoolId);
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
      filterByFormula: `{visibility} = "student"`,
      sort: [{ field: "order", direction: "asc" }],
    }).all();

    const folders = folderRecords.map(sanitizeFolder);
    const folderIds = folders.map((folder) => folder.id);
    const folderIdSet = new Set(folderIds);

    let files = [];
    if (folderIdSet.size > 0) {
      const fileFilterFormula = `OR(${folderIds
        .map((id) => `FIND('${id}', ARRAYJOIN({folder}))`)
        .join(",")})`;

      const fileRecords = await tbl.FILES.select({
        filterByFormula: fileFilterFormula,
        fields: [
          "title",
          "type",
          "url",
          "size",
          "folder",
          "order",
          "slug",
          "name",
          "school",
          "schools",
          "description",
        ],
        sort: [{ field: "order", direction: "asc" }],
      }).all();

      files = fileRecords
        .filter((record) => filterFileBySchool(record, payload?.schoolId))
        .map((record) => ({
          record,
          folderId: extractFolderId(record),
        }))
        .filter(({ folderId }) => folderId && folderIdSet.has(folderId))
        .map(({ record }) => sanitizeFile(record));
    }

    res.status(200).json({ folders, files });
  } catch (error) {
    console.error("Failed to load student content tree", error);
    return sendError(res, 500, "Errore nel recupero dei contenuti");
  }
}
