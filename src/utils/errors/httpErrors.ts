// errors/httpErrors.ts

import { ApiError } from "./apiError";

/**
 * 400 Bad Request
 */
export class BadRequestError extends ApiError {
  constructor(errors?: Record<string, any>, message = "Bad request") {
    super(message, 400, errors);
  }
}

/**
 * 401 Unauthorized
 */
export class UnauthorizedError extends ApiError {
  constructor(errors?: Record<string, any>, message = "Unauthorized") {
    super(message, 401, errors);
  }
}

/**
 * 403 Forbidden
 */
export class ForbiddenError extends ApiError {
  constructor(errors?: Record<string, any>, message = "Forbidden") {
    super(message, 403, errors);
  }
}

/**
 * 422 Validation Error
 */
export class ValidationError extends ApiError {
  constructor(errors?: Record<string, any>, message = "Validation error") {
    super(message, 422, errors);
  }
}

/**
 * 404 Not Found
 */
export class NotFoundError extends ApiError {
  constructor(errors?: Record<string, any>, message = "Not found") {
    super(message, 404, errors);
  }
}

/**
 * 409 Conflict
 */
export class ConflictError extends ApiError {
  constructor(errors?: Record<string, any>, message = "Conflict") {
    super(message, 409, errors);
  }
}

/**
 * 500 Internal Server Error
 */
export class InternalServerError extends ApiError {
  constructor(errors?: Record<string, any>, message = "Internal server error") {
    super(message, 500, errors);
  }
}
