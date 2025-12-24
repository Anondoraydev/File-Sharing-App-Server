export class ApiError extends Error {
  statusCode: number;
  status: boolean;

  constructor(
    message: string = "Internal Server Error",
    statusCode: number = 500
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.status = false;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
