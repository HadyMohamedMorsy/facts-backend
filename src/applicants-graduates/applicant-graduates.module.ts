import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Graduates } from "src/graduates/graduates.entity";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { ApplicantGraduatesRelationMiddleware } from "./applicant-graduates-relation.middleware";
import { ApplicantGraduatesController } from "./applicant-graduates.controller";
import { ApplicantGraduates } from "./applicant-graduates.entity";
import { ApplicantGraduatesService } from "./applicant-graduates.service";

@Module({
  imports: [
    FilterDateModule,
    TypeOrmModule.forFeature([ApplicantGraduates, Graduates]),
  ],
  controllers: [ApplicantGraduatesController],
  providers: [ApplicantGraduatesService, ApplicantGraduatesRelationMiddleware],
  exports: [ApplicantGraduatesService],
})
export class ApplicantGraduatesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApplicantGraduatesRelationMiddleware)
      .forRoutes(
        { path: "applicant-graduates/store", method: RequestMethod.POST },
        { path: "applicant-graduates/update", method: RequestMethod.PUT },
      );
  }
}
