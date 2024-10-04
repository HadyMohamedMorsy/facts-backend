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
    const createdBy = request.headers["created_by"];

    if (!createdBy) {
      throw new BadRequestException("Missing x-localization or created_by in headers");
    }

    request.body = {
      ...request.body,
      created_by: createdBy,
    };

    return next.handle();
  }
}
