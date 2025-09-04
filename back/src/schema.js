import crypto from "crypto";
import { form as staticSchema } from "../../shared/schema/schemes.js";

export async function getSchema() {
  return staticSchema;
}

export async function getSchemaETag() {
  const schema = await getSchema();
  const json = JSON.stringify(schema);
  const hash = crypto.createHash("sha256").update(json).digest("base64");
  return `"sha256-${hash}"`;
}
