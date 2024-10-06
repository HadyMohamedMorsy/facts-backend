import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { ApplicantEducationController } from "./applicant-education.controller";
import { ApplicantEducation } from "./applicant-education.entity";
import { ApplicantEducationService } from "./providers/applicants-education.service";

@Module({
  imports: [UsersModule, FilterDateModule, TypeOrmModule.forFeature([ApplicantEducation])],
  controllers: [ApplicantEducationController],
  providers: [ApplicantEducationService],
})
export class ApplicantEducationModule {}
