// @ts-nocheck
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getDefaultValues, buildYupFromSchema } from "../../shared/index.js";
import { getSchema, getSchemaETag } from "./schema.js";
import { listSubmissions, saveSubmission } from "./services/submissionsService.js";
import submissionsRoutes from "./routes/submissions.routes.js";
import schemaRoutes from "./routes/schema.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/schema", schemaRoutes);
app.use("/submissions", submissionsRoutes);



const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
