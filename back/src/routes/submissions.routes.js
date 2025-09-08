import { Router } from "express";
import {
  createSubmission,
  getSubmissions,
} from "../controllers/submissions.controller.js";

const router = Router();

router.post("/", createSubmission);
router.get("/", getSubmissions);

export default router;
