// @ts-nocheck
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getDefaultValues, buildYupFromSchema } from "../../shared/index.js";
// import { form as schema } from "../../shared/schema/schemes.js";
import { getSchema, getSchemaETag } from "./schema.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/schema", async (req, res) => {
  try {
    const etag = await getSchemaETag();
    console.log("etag: ", etag);//testing
    if (req.headers["if-none-match"] === etag) {
      res.status(304).end();
      return;
    }
    const schema = await getSchema();
    res.setHeader("ETag", etag);
    res.setHeader("Cache-Control", "no-cache");
    res.json({ schema });
  } catch (err) {
    console.error("GET /schema failed:", err);
    res.status(500).json({ ok: false, error: "INTERNAL_ERROR" });
  }
});



app.post("/submissions", async (req, res) => {
  try {
    const { schema } = await (async () => ({ schema: await getSchema() }))();
    const yupSchema = buildYupFromSchema(schema);
    const data = await yupSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    console.log("Received submission: ", data);//testing
    
    res.status(201).json({ ok: true, received: data });
  } catch (err) {
    if (err?.name === "ValidationError") {
      return res
        .status(400)
        .json({ ok: false, error: "VALIDATION_ERROR", details: err.errors });
    }
    res.status(500).json({ ok: false, error: "INTERNAL_ERROR" });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
