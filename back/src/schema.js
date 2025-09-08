import crypto from "crypto";
import schema from "../../shared/schema/form.schema.json" with  { type: "json" };

export async function getSchema() {
  return schema;
}

export async function getSchemaETag() {
  const json = JSON.stringify(schema);
  const hash = crypto.createHash("sha256").update(json).digest("base64");
  return `"sha256-${hash}"`;
}
