// @ts-nocheck
import { getSchema, getSchemaETag } from "../schema.js";

export async function getSchemaHandler(req, res) {
  const etag = await getSchemaETag();
  if (req.headers["if-none-match"] === etag) {
    res.status(304).end();
    return;
  }

  const schema = await getSchema();
  res.setHeader("ETag", etag);
  res.setHeader("Cache-Control", "no-cache");
  res.json({ schema });
}
