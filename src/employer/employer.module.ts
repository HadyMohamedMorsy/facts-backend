import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { EmployerController } from "./employer.controller";
import { Employer } from "./employer.entity";
import { EmployerService } from "./employer.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Employer])],
  controllers: [EmployerController],
  providers: [EmployerService],
  exports: [EmployerService],
})
export class EmployerModule {}
