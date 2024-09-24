import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { ConsultancyAccordion } from "./consultancy-accordion.entity";
import { ConsultancyController } from "./consultancy.controller";
import { Consultancy } from "./consultancy.entity";
import { ConsultancyService } from "./providers/consultancy.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Consultancy, ConsultancyAccordion])],
  controllers: [ConsultancyController],
  providers: [ConsultancyService],
})
export class ConsultancyModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(UploadFileMiddleware).forRoutes("*");
  // }
}
