export class AppError extends Error {
  constructor({ code, message, status = 500, details = null }) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.status = status;
    this.details = details;
  }
}
