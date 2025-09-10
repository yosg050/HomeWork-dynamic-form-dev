import { Router } from "express";
import {
  createSubmission,
  getSubmissions,
} from "../controllers/submissions.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.post("/", asyncHandler(createSubmission));
router.get("/", asyncHandler(getSubmissions));

export default router;
