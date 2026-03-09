import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { GraduatesUserRelationMiddleware } from "./graduates-user-relation.middleware";
import { GraduatesController } from "./graduates.controller";
import { Graduates } from "./graduates.entity";
import { GraduatesService } from "./graduates.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Graduates, User])],
  controllers: [GraduatesController],
  providers: [GraduatesService, GraduatesUserRelationMiddleware],
  exports: [GraduatesService],
})
export class GraduatesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GraduatesUserRelationMiddleware)
      .forRoutes(
        { path: "graduates/store", method: RequestMethod.POST },
        { path: "graduates/update", method: RequestMethod.PUT },
      );
  }
}
