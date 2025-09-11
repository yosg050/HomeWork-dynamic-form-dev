// @ts-nocheck
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {buildYupFromSchema } from "../shared/index.js";
import { getSchema, getSchemaETag } from "./src/schema.js";
import { listSubmissions, saveSubmission } from "./src/services/submissions.Service.js";
import submissionsRoutes from "./src/routes/submissions.routes.js";
import schemaRoutes from "./src/routes/schema.routes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { notFound } from "./src/middlewares/notFound.js";
import analyticsRoutes from "./src/routes/analytics.routes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/schema", schemaRoutes);
app.use("/submissions", submissionsRoutes);
app.use("/analytics", analyticsRoutes);
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
