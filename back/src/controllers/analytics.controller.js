import { getAnalytics } from "../services/analytics.Service.js";

export async function getAnalyticsController(req, res) {

  try {
    const analytics = await getAnalytics();
    res.json({
      ok: true,
      analytics,
    });
  } catch (err) {
    console.error("GET /analytics failed:", err);
    const status = err?.status ?? 500;
    res.status(status).json({
      ok: false,
      error: err?.code ?? "INTERNAL_ERROR",
      message: err?.message ?? "Failed to compute analytics",
      details: err?.details ?? null,
    });
  }
}
