import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { ApplicantJobController } from "./applicant-job.controller";
import { ApplicantJob } from "./applicant-job.entity";
import { ApplicantJobsService } from "./providers/applicants-job.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([ApplicantJob])],
  controllers: [ApplicantJobController],
  providers: [ApplicantJobsService],
})
export class ApplicantJobsModule {}
