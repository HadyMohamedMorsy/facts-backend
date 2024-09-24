import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobController } from "./job.controller";
import { Job } from "./job.entity";
import { JobService } from "./providers/job.service";
@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  controllers: [JobController],
  providers: [JobService],
})
export class JobsModule {}
