// @ts-nocheck
import { buildYupFromSchema } from "../../../shared/index.js";
import { ValidationError } from "../errors/DomainErrors.js";
import { putSubmission } from "../repositories/submissionsRepo.js";
import { getSchema } from "../schema.js";
import {
  listSubmissions,
  saveSubmission,
} from "../services/submissionsService.js";
import { createSubmissionHash } from "../utils/hash.js";

export async function createSubmission(req, res) {
  try {
    const schema = await getSchema();
    const yupSchema = buildYupFromSchema(schema);

    const validData = await yupSchema
      .validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      })
      .catch((err) => {
        throw new ValidationError(err.errors);
      });

    const hash = createSubmissionHash(validData, schema);
    const saved = await saveSubmission(validData, hash);
    console.log("Received submission: ", validData); // testing

    res.status(201).json({
      ok: true,
      message: "Submission saved successfully",
      // data: saved,
    });
  } catch (err) {
    const status = err.status ?? 500;
    const code = err.code ?? "INTERNAL_ERROR";
    const message = err.message ?? "Unexpected server error";

    console.error("ERROR:", err);

    res.status(status).json({ ok: false, error: code, message });
  }
}


export async function getSubmissions(req, res) {
  try {
    const limit = Math.min(Number(req.query.limit) || 100, 500);

    let cursor;
    if (req.query.cursor != null) {
      try {
        cursor = JSON.parse(req.query.cursor);
      } catch (e) {
        return res.status(400).json({
          ok: false,
          error: "VALIDATION_ERROR",
          message: "'cursor' must be a valid JSON string",
        });
      }
    }

    const { items, nextCursor } = await listSubmissions({ limit, cursor });
    res.json({ ok: true, items, nextCursor });
  } catch (err) {
    const status = err?.status ?? 500;
    const code = err?.code ?? "INTERNAL_ERROR";
    const msg = err?.message ?? "Unexpected server error";

    console.error("GET /submissions failed:", err);
    res.status(status).json({ ok: false, error: code, message: msg });
  }
}
