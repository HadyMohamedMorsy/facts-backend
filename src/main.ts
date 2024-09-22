import { NestFactory } from "@nestjs/core";
// import * as multer from "multer";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(multer().any());
  app.setGlobalPrefix("/api/v1");
  await app.listen(3000);
}
bootstrap();
