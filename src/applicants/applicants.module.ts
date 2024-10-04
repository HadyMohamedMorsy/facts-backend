import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { ApplicantsController } from "./applicant.controller";
import { Applicant } from "./applicant.entity";
import { ApplicantsService } from "./providers/applicants.service";

@Module({
  imports: [UsersModule, FilterDateModule, TypeOrmModule.forFeature([Applicant])],
  controllers: [ApplicantsController],
  providers: [ApplicantsService],
})
export class ApplicantsModule {}
