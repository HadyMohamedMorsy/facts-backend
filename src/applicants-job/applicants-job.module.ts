import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { ApplicantJobController } from "./applicant-job.controller";
import { ApplicantJob } from "./applicant-job.entity";
import { ApplicantJobsService } from "./providers/applicants-job.service";

@Module({
  imports: [UsersModule, FilterDateModule, TypeOrmModule.forFeature([ApplicantJob])],
  controllers: [ApplicantJobController],
  providers: [ApplicantJobsService],
})
export class ApplicantJobsModule {}
