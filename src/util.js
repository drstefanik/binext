import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function hashPassword(pw) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(pw, salt);
}

export async function comparePassword(pw, hash) {
  return bcrypt.compare(pw, hash);
}

export function signJWT(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
}
