import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";

export class HeaderToBodyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const languageId = request.headers["language_id"];
    const createdBy = request.headers["created_by"];

    if (!languageId || !createdBy) {
      throw new BadRequestException("Missing language_id or created_by in headers");
    }

    request.body = {
      ...request.body,
      language_id: languageId,
      created_by: createdBy,
    };

    return next.handle();
  }
}
