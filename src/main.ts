import { NestFactory } from "@nestjs/core";
import * as multer from "multer";
import { AppModule } from "./app.module";
import { TransformInterceptor } from "./shared/common/interceptor/transform-request.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(multer().any());
  app.enableCors();
  app.setGlobalPrefix("/api/v1");
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
