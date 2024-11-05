import { ValidationPipe } from "@nestjs/common";
import { dtoMappings } from "src/shared/config/dto-mapping";

export async function validateDto<T>(path: string, body: T, isPartial: boolean = true) {
  const dtoClass = dtoMappings[path];
  const validationPipe = new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: isPartial,
  });

  return await validationPipe.transform(body, {
    metatype: dtoClass,
    type: "body",
  });
}
