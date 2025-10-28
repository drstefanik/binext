import { ensureMethod, parseJsonBody, sendError } from "../_lib/http.js";
import { hashPassword, signJWT } from "../../src/util.js";
import { tbl } from "../../src/airtable.js";
import { findStudentByEmail } from "../../src/finders.js";

export default async function handler(req, res) {
  if (!ensureMethod(req, res, "POST")) return;

  let body;
  try {
    body = await parseJsonBody(req);
  } catch (error) {
    console.error("Invalid JSON body", error);
    return sendError(res, 400, "Payload non valido");
  }

  const full_name = typeof body?.full_name === "string" ? body.full_name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const schoolIdRaw = typeof body?.schoolId === "string" ? body.schoolId.trim() : "";
  const schoolId = schoolIdRaw || undefined;

  if (!full_name || !email || !password) {
    return sendError(res, 400, "Dati di registrazione studente incompleti");
  }

  try {
    const existing = await findStudentByEmail(email);
    if (existing) {
      return sendError(res, 409, "Email già registrata");
    }

    const password_hash = await hashPassword(password);

    const created = await tbl.STUDENTS.create([
      {
        fields: {
          full_name,
          email,
          password_hash,
          status: "active",
          school: schoolId ? [schoolId] : [],
        },
      },
    ]);

    const id = created[0]?.id;
    if (!id) {
      console.error("Student creation failed", created);
      return sendError(res, 500, "Impossibile creare lo studente");
    }

    const payload = {
      role: "student",
      id,
      email,
    };

    if (schoolId) {
      payload.schoolId = schoolId;
    }

    const response = {
      token: signJWT(payload),
      role: "student",
      id,
      name: full_name,
    };

    if (schoolId) {
      response.schoolId = schoolId;
    }

    res.status(201).json(response);
  } catch (error) {
    console.error("Signup student error", error);
    return sendError(res, 500, "Server error");
  }
}
