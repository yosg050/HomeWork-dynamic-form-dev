import bcrypt from "bcryptjs";
import {
  putSubmission,
  scanSubmissions,
} from "../repositories/submissionsRepo.js";

export async function saveSubmission(validData, hash) {
 

  const passwordHash = await bcrypt.hash(String(validData.password), 10);

  const item = {
    hash,
    email: String(validData.email).toLowerCase().trim(),
    username: String(validData.username || "").trim(),
    passwordHash,
    birthdate: String(validData.birthdate),
    gender: String(validData.gender),
    createdAt: new Date().toISOString(),
  };

  const result = await putSubmission(item);
  if (result.$metadata.httpStatusCode !== 200) {
    throw new Error("Failed to save submission");
  }

  const { passwordHash: _, ...safe } = item;
  return safe;
}


export async function listSubmissions({ limit = 100, cursor } = {}) {
  const { items: rawItems = [], nextCursor } = await scanSubmissions({
    limit,
    cursor,
  });

  const items = [...rawItems].sort((a, b) =>
    String(b.createdAt).localeCompare(String(a.createdAt))
  );

  return { items, nextCursor };
}
