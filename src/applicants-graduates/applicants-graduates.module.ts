import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { ApplicantGraduatesController } from "./applicant-graduates.controller";
import { ApplicantGraduates } from "./applicant-graduates.entity";
import { ApplicantGraduatesService } from "./providers/applicants-graduates.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([ApplicantGraduates])],
  controllers: [ApplicantGraduatesController],
  providers: [ApplicantGraduatesService],
})
export class ApplicantGraduatesModule {}
