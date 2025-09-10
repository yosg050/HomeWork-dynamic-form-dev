import { AppError } from "./AppError.js";

export class ValidationError extends AppError {
  constructor(details) {
    super({
      code: "VALIDATION_ERROR",
      message: "Validation failed",
      status: 400,
      details,
    });
  }
}

export class DuplicateSubmissionError extends AppError {
  constructor() {
    super({
      code: "DUPLICATE_SUBMISSION",
      message: "This submission already exists.",
      status: 409,
    });
  }
}

export class InternalError extends AppError {
  constructor() {
    super({
      code: "INTERNAL_ERROR",
      message: "Unexpected server error",
      status: 500,
    });
  }
}
