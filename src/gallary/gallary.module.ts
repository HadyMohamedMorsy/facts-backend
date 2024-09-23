import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UploadFilesMiddleware } from "src/shared/common/middleware/upload-files.middleware";
import { GallaryController } from "./gallary.controller";
import { Gallary } from "./gallary.entity";
import { GallaryService } from "./providers/gallary.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Gallary])],
  controllers: [GallaryController],
  providers: [GallaryService],
})
export class GallaryModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UploadFilesMiddleware).forRoutes("*");
  }
}
