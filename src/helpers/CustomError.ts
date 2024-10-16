import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomError {
  constructor(msg: string, error?: Error ) {
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: msg,
    }, HttpStatus.FORBIDDEN, {
      cause: error || msg
    });
  }
}