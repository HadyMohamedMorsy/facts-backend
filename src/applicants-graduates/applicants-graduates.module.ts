import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { ApplicantGraduatesController } from "./applicant-graduates.controller";
import { ApplicantGraduates } from "./applicant-graduates.entity";
import { ApplicantGraduatesService } from "./providers/applicants-graduates.service";

@Module({
  imports: [UsersModule, FilterDateModule, TypeOrmModule.forFeature([ApplicantGraduates])],
  controllers: [ApplicantGraduatesController],
  providers: [ApplicantGraduatesService],
})
export class ApplicantGraduatesModule {}
