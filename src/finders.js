import { tbl } from "./airtable.js";

const pick = r => ({ id: r.id, ...r.fields });

export async function findByEmailIn(table, email) {
  const res = await table.select({
    filterByFormula: `LOWER({email}) = "${String(email).toLowerCase()}"`
  }).firstPage();
  return res[0] ? pick(res[0]) : null;
}

export async function findAdminByEmail(email)   { return findByEmailIn(tbl.ADMIN, email); }
export async function findSchoolByEmail(email)  { return findByEmailIn(tbl.SCHOOLS, email); }
export async function findStudentByEmail(email) { return findByEmailIn(tbl.STUDENTS, email); }

export async function findOTP(code) {
  const res = await tbl.SCHOOL_OTP.select({
    filterByFormula: `{otp_code} = "${code}"`,
    maxRecords: 1
  }).firstPage();
  return res[0] ? { id: res[0].id, ...res[0].fields } : null;
}
