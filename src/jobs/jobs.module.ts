import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { JobController } from "./job.controller";
import { Job } from "./job.entity";
import { JobService } from "./providers/job.service";
@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Job])],
  controllers: [JobController],
  providers: [JobService],
})
export class JobsModule {}
