import { ApiSuccess } from "./apiSuccess.ts";

export class OKResponse extends ApiSuccess {
  constructor(message = "Success", data = {}) {
    super(message, true, 200, data);
  }
}

export class CreatedResponse extends ApiSuccess {
  constructor(message = "Resource created", data = {}, downloadUrl?: string) {
    super(message, true, 201, data);
  }
}

export class NoContentResponse extends ApiSuccess {
  constructor(message = "No content", data = {}) {
    super(message, true, 204, data);
  }
}

export class AcceptedResponse extends ApiSuccess {
  constructor(message = "Resource accepted", data = {}) {
    super(message, true, 202, data);
  }
}

export class BadRequestResponse extends ApiSuccess {
  constructor(message = "Bad request", data = {}) {
    super((message = "Bad request"), false, 400, data);
  }
}

export class UnauthorizedResponse extends ApiSuccess {
  constructor(message = "Unauthorized", data = {}) {
    super(message, false, 401, data);
  }
}

export class ForbiddenResponse extends ApiSuccess {
  constructor(message = "Forbidden", data = {}) {
    super(message, false, 403, data);
  }
}

export class NotFoundResponse extends ApiSuccess {
  constructor(message = "Not found", data = {}) {
    super(message, false, 404, data);
  }
}
