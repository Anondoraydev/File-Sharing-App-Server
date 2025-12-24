import e from "express";
import { ApiError } from "./apiError.ts";

export class BadRequestError extends ApiError {
  constructor(message: string = "Bad Request") {
    super(message, 400);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Not Found") {
    super(message, 404);
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = "Internal Server Error") {
    super(message, 500);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = "Unauthorized") {
    super(message, 401);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = "Forbidden") {
    super(message, 403);
  }
}

export class ConflictError extends ApiError {
  constructor(message: string = "Conflict") {
    super(message, 409);
  }
}

export class PaymentRequiredError extends ApiError {
  constructor(message: string = "Payment Required") {
    super(message, 402);
  }
}

export class TooManyRequestsError extends ApiError {
  constructor(message: string = "Too Many Requests") {
    super(message, 429);
  }
}

export class ServiceUnavailableError extends ApiError {
  constructor(message: string = "Service Unavailable") {
    super(message, 503);
  }
}

export class GatewayTimeoutError extends ApiError {
  constructor(message: string = "Gateway Timeout") {
    super(message, 504);
  }
}

export class NetworkAuthenticationRequiredError extends ApiError {
  constructor(message: string = "Network Authentication Required") {
    super(message, 511);
  }
}
