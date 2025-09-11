import { apiFetch } from "./apiClient";

export async function postSubmission(payload) {
  const res = await apiFetch("/submissions", { method: "POST", body: payload });
  return res.json(); // { ok, message }
}
// export async function listSubmissions() {
//   const res = await apiFetch("/submissions");
//   const data = await res.json();
//   console.log("data ", data);
  
//   return data.items ?? [];
// }

export async function listSubmissions({ limit = 50, cursor } = {}) {
  const qs = new URLSearchParams();
  if (limit) qs.set("limit", String(limit));
  if (cursor !== undefined) qs.set("cursor", JSON.stringify(cursor));

  const res = await apiFetch(`/submissions?${qs.toString()}`);
  const data = await res.json(); // { ok, items, nextCursor }
  if (!data?.ok) {
    throw new Error(data?.message || "Failed to load submissions");
  }
  return { items: data.items ?? [], nextCursor: data.nextCursor };
}