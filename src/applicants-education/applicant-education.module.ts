import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Education } from "src/educations/education.entity";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { ApplicantEducationRelationMiddleware } from "./applicant-education-relation.middleware";
import { ApplicantEducationController } from "./applicant-education.controller";
import { ApplicantEducation } from "./applicant-education.entity";
import { ApplicantEducationService } from "./applicant-education.service";

@Module({
  imports: [
    FilterDateModule,
    TypeOrmModule.forFeature([ApplicantEducation, Education]),
  ],
  controllers: [ApplicantEducationController],
  providers: [ApplicantEducationService, ApplicantEducationRelationMiddleware],
  exports: [ApplicantEducationService],
})
export class ApplicantEducationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApplicantEducationRelationMiddleware)
      .forRoutes(
        { path: "applicant-education/store", method: RequestMethod.POST },
        { path: "applicant-education/update", method: RequestMethod.PUT },
      );
  }
}
