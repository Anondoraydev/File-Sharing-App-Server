// errors/httpErrors.ts
import { ApiError } from "./apiError.ts";

type ErrorDetails = Record<string, unknown>;

/**
 * 400 Bad Request
 */
export class BadRequestError extends ApiError {
  constructor(message = "Bad request", errors?: ErrorDetails) {
    super(message, 400, errors);
  }
}

/**
 * 401 Unauthorized
 */
export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized", errors?: ErrorDetails) {
    super(message, 401, errors);
  }
}

/**
 * 403 Forbidden
 */
export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden", errors?: ErrorDetails) {
    super(message, 403, errors);
  }
}

/**
 * 422 Validation Error
 */
export class ValidationError extends ApiError {
  constructor(message = "Validation error", errors?: ErrorDetails) {
    super(message, 422, errors);
  }
}

/**
 * 404 Not Found
 */
export class NotFoundError extends ApiError {
  constructor(message = "Not found", errors?: ErrorDetails) {
    super(message, 404, errors);
  }
}

/**
 * 409 Conflict
 */
export class ConflictError extends ApiError {
  constructor(message = "Conflict", errors?: ErrorDetails) {
    super(message, 409, errors);
  }
}

/**
 * 500 Internal Server Error
 */
export class InternalServerError extends ApiError {
  constructor(message = "Internal server error", errors?: ErrorDetails) {
    super(message, 500, errors);
  }
}

/**
 * 502 Bad Gateway
 */
export class BadGatewayError extends ApiError {
  constructor(message = "Bad gateway", errors?: ErrorDetails) {
    super(message, 502, errors);
  }
}
