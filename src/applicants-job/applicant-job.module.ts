import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Job } from "src/jobs/job.entity";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { ApplicantJobRelationMiddleware } from "./applicant-job-relation.middleware";
import { ApplicantJobController } from "./applicant-job.controller";
import { ApplicantJob } from "./applicant-job.entity";
import { ApplicantJobService } from "./applicant-job.service";

@Module({
  imports: [
    FilterDateModule,
    TypeOrmModule.forFeature([ApplicantJob, Job]),
  ],
  controllers: [ApplicantJobController],
  providers: [ApplicantJobService, ApplicantJobRelationMiddleware],
  exports: [ApplicantJobService],
})
export class ApplicantJobModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApplicantJobRelationMiddleware)
      .forRoutes(
        { path: "applicant-job/store", method: RequestMethod.POST },
        { path: "applicant-job/update", method: RequestMethod.PUT },
      );
  }
}
