import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LanguagesModule } from "src/languages/languages.module";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { JobController } from "./job.controller";
import { Job } from "./job.entity";
import { JobService } from "./providers/job.service";
@Module({
  imports: [UsersModule, LanguagesModule, FilterDateModule, TypeOrmModule.forFeature([Job])],
  controllers: [JobController],
  providers: [JobService],
})
export class JobsModule {}
