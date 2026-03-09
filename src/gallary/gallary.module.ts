import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tab } from "src/tab/tab.entity";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { GallaryTabRelationMiddleware } from "./gallary-tab.middleware";
import { GallaryController } from "./gallary.controller";
import { Gallary } from "./gallary.entity";
import { GallaryService } from "./gallary.service";

@Module({
  imports: [
    FilterDateModule,
    TypeOrmModule.forFeature([Gallary, Tab]),
  ],
  controllers: [GallaryController],
  providers: [GallaryService, GallaryTabRelationMiddleware],
  exports: [GallaryService],
})
export class GallaryModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GallaryTabRelationMiddleware)
      .forRoutes(
        { path: "gallary/store", method: RequestMethod.POST },
        { path: "gallary/update", method: RequestMethod.PUT },
      );
  }
}
