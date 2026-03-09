import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { EducationAccordion } from "./education-accordion.entity";
import { EducationController } from "./education.controller";
import { EducationDetails } from "./education-details.entity";
import { Education } from "./education.entity";
import { EducationService } from "./education.service";

@Module({
  imports: [
    FilterDateModule,
    TypeOrmModule.forFeature([Education, EducationAccordion, EducationDetails]),
  ],
  controllers: [EducationController],
  providers: [EducationService],
  exports: [EducationService],
})
export class EducationModule {}
