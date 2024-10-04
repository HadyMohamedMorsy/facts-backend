import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { EducationAccordion } from "./education-accordion.entity";
import { EducationDetails } from "./education-details.entity";
import { EducationController } from "./education.controller";
import { Education } from "./education.entity";
import { EducationService } from "./providers/education.service";

@Module({
  imports: [
    UsersModule,
    FilterDateModule,
    TypeOrmModule.forFeature([Education, EducationAccordion, EducationDetails]),
  ],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationsModule {}
