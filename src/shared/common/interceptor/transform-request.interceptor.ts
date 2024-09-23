import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable()
export class TransformRequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => data.trans),
      tap(data => console.log(data)),
    );
  }
}
