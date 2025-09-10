import { AppError } from "../errors/AppError.js";
import { InternalError } from "../errors/DomainErrors.js";

export function errorHandler(err, req, res, _next) {
  const isProd = process.env.NODE_ENV === "production";

  const appErr =
    err instanceof AppError
      ? err
      : new InternalError("Unexpected error", { cause: err?.message });

  console.error(`[${req.method} ${req.originalUrl}]`, err);

  const isClientError = appErr.status >= 400 && appErr.status < 500;

  const payload = {
    ok: false,
    error: appErr.code ?? "INTERNAL_ERROR",
    message: appErr.message ?? "Unexpected error",
    details: !isProd || isClientError ? appErr.details ?? null : null,
  };

  if (!isProd) {
    payload.stack = err.stack;
  }

  res
    .status(Number(appErr.status) || 500)
    .set("Cache-Control", "no-store")
    .json(payload);
}
