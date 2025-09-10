const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export async function apiFetch(
  path,
  { method = "GET", headers = {}, body } = {}
) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok && res.status !== 304) {
    const txt = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${txt}`);
  }
  return res;
}
