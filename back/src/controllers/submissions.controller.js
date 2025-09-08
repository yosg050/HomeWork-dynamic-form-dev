// @ts-nocheck
import { buildYupFromSchema } from "../../../shared/index.js";
import { getSchema } from "../schema.js";
import { listSubmissions, saveSubmission } from "../services/submissionsService.js";

export async function createSubmission(req, res) {
  try {
    const schema = await getSchema();
    const yupSchema = buildYupFromSchema(schema);
    const data = await yupSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    console.log("Received submission: ", data); // testing

    const saved = await saveSubmission(data);

    res.status(201).json({
      ok: true,
      message: "Submission saved successfully",
      // data: saved,
    });
  } catch (err) {
    if (err?.name === "ValidationError") {
      return res.status(400).json({
        ok: false,
        error: "VALIDATION_ERROR",
        details: err.errors,
      });
    }
    console.error("INTERNAL_ERROR:", err);
    res.status(500).json({ ok: false, error: "INTERNAL_ERROR" });
  }
}

export async function getSubmissions(req, res) {
  try {
    const limit = Math.min(Number(req.query.limit) || 100, 500);
    const cursor = req.query.cursor ? JSON.parse(req.query.cursor) : undefined;

    const { items, nextCursor } = await listSubmissions({ limit, cursor });
    res.json({
      ok: true,
      items,
      nextCursor,
    });
  } catch (err) {
    console.error("GET /submissions failed:", err);
    res.status(500).json({ ok: false, error: "INTERNAL_ERROR" });
  }
}
