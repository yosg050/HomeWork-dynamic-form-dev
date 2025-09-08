import { apiFetch } from "./apiClient";

let lastEtag = null;

export async function getSchema() {
  const headers = {};
  if (lastEtag) headers["If-None-Match"] = lastEtag;

  const res = await apiFetch("/schema", { headers });
  if (res.status === 304) return { notModified: true, schema: undefined };

  lastEtag = res.headers.get("ETag") || null;
  const { schema } = await res.json();
  return { notModified: false, schema };
}
