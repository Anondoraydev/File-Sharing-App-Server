export class ApiError extends Error {
  statusCode: number;
  status: boolean;
  errors: {} = {};

  constructor(
    message: string = "Internal Server Error",
    statusCode: number = 500,
    error: {} = {}
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.status = false;
    this.errors = error;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
