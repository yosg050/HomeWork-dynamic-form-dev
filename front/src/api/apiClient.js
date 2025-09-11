const getApiBaseUrl = () => {
  if (import.meta.env.DEV) {
    return "http://localhost:4000";
  }

  return "";
};

const API_BASE = getApiBaseUrl();

export async function apiFetch(
  path,
  { method = "GET", headers = {}, body } = {}
) {
  const fullPath = API_BASE ? `${API_BASE}${path}` : `/api${path}`;

  const res = await fetch(fullPath, {
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
