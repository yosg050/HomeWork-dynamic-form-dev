import crypto from "node:crypto";

export function createSubmissionHash(data, schema) {
  const fields = schema?.fields ?? [];
  const canonical = {};

  for (const key of fields.map((f) => f.name).sort()) {
    let value = data[key];
    const type = fields.find((f) => f.name === key)?.type;

    if (type === "email") {
      value = String(value).trim().toLowerCase();
    } else if (
      type === "text" ||
      type === "password" ||
      type === "select" ||
      type === "number"
    ) {
      value = String(value).trim();
    } else if (type === "date") {
      const d = new Date(value);
      if (!Number.isNaN(d.getTime())) value = d.toISOString().slice(0, 10); // YYYY-MM-DD
    }
    canonical[key] = value;
  }
  const stable = JSON.stringify(canonical);
  return crypto.createHash("sha256").update(stable).digest("hex");
}
