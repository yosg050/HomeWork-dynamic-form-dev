import { apiFetch } from "./apiClient";

export async function postSubmission(payload) {
  const res = await apiFetch("/submissions", { method: "POST", body: payload });
  return res.json(); // { ok, message }
}
export async function listSubmissions() {
  const res = await apiFetch("/submissions");
  const data = await res.json();
  console.log("data ", data);
  
  return data.items ?? [];
}
