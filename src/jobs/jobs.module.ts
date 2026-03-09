import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { JobController } from "./job.controller";
import { Job } from "./job.entity";
import { JobService } from "./job.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Job])],
  controllers: [JobController],
  providers: [JobService],
  exports: [JobService],
})
export class JobsModule {}
