import { Context } from "koa";
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

interface ResponseData {
  code?: number;
  message: string;
  data?: any;
  error?: any;
}

export function sendResponse(ctx: Context, status: HttpStatus, data: ResponseData) {
  ctx.status = status;
  ctx.body = { code: status, status: [HttpStatus.OK, HttpStatus.CREATED].includes(status), ...data };
}
