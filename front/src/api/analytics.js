import { apiFetch } from "./apiClient";

export async function getAnalytics() {
  const res = await apiFetch("/analytics", { method: "GET" });
  const data = await res.json();

  if (!data.ok) {
    throw new Error(data.message || "Failed to fetch analytics");
  }
 
  return (
    data.analytics ?? {
      totalSubmissions: 0,
      perGender: {},
      averageAgeYears: null,
      derived: { ageBuckets: {}, lastSubmissionAt: null },
    }
  );
}
