import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getAnalyticsController } from "../controllers/analytics.controller.js";

const router = Router();

router.get("/", asyncHandler(getAnalyticsController));

export default router;