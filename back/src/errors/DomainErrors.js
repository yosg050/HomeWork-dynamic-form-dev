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
  constructor(message = "Unexpected server error", options = {}) {
    super({
      code: "INTERNAL_ERROR",
      message,
      status: 500,
      details: options.cause ? { cause: options.cause } : null,
    });
  }
}

export class NotFoundError extends AppError {
  constructor(resource = "Resource") {
    super({
      code: "NOT_FOUND",
      message: `${resource} not found`,
      status: 404,
    });
  }
}
