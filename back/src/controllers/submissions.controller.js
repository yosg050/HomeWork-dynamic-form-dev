// @ts-nocheck
import { buildYupFromSchema } from "../../../shared/index.js";
import { ValidationError } from "../errors/DomainErrors.js";
import { putSubmission } from "../repositories/submissionsRepo.js";
import { getSchema } from "../schema.js";
import {
  listSubmissions,
  saveSubmission,
} from "../services/submissions.Service.js";
import { createSubmissionHash } from "../utils/hash.js";

export async function createSubmission(req, res) {
 
  const schema = await getSchema();
  const yupSchema = buildYupFromSchema(schema);

  const validData = await yupSchema
    .validate(req.body, { abortEarly: false, stripUnknown: true })
    .catch((err) => {
      throw new ValidationError("Form validation failed", {
        fields: (err?.inner || []).map((e) => ({
          path: e.path,
          message: e.message,
          type: e.type,
        })),
      });
    });

  const hash = createSubmissionHash(validData, schema);
  const saved = await saveSubmission(validData, hash);

  res.status(201).json({
    ok: true,
    message: "Submission saved successfully",
    // data: saved,
  });
}

export async function getSubmissions(req, res) {
  console.log("test Submissions : ", new Date()); //testing
  const limit = Math.min(Number(req.query.limit) || 100, 500);
  const cursor = req.query.cursor ? JSON.parse(req.query.cursor) : undefined;

  const { items, nextCursor } = await listSubmissions({ limit, cursor });
  res.json({
    ok: true,
    items,
    nextCursor,
  });
}
