export class ApiSuccess {
  statusCode;
  status;
  message;
  data;
  constructor(
    message: string,
    status: boolean,
    statusCode: number,
    data: object
  ) {
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
