import { Router } from "express";
import { getSchemaHandler } from "../controllers/schema.controller.js";

const router = Router();

router.get("/", getSchemaHandler);

export default router;
