const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export async function fetchSchema() {
  const res = await fetch(`${API_BASE}/schema`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to load schema");
  const { schema } = await res.json();
  return schema;
}

export async function postSubmission(payload) {
  const res = await fetch(`${API_BASE}/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Submit failed");
  return data;
}

export async function getSubmissions() {
  const res = await fetch(`${API_BASE}/submissions`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to load submissions");
  const data = await res.json();
  return data.items ?? [];
}
