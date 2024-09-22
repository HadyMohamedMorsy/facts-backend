import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/common/filter/filter-date.module";
import { EducationAccordion } from "./education-accordion.entity";
import { EducationController } from "./education.controller";
import { Education } from "./education.entity";
import { EducationService } from "./providers/education.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Education, EducationAccordion])],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationsModule {}
