import { Router } from "express";
import { getSchemaHandler } from "../controllers/schema.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(getSchemaHandler));

export default router;
