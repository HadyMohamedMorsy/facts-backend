import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { StatisticsController } from "./statistics.controller";
import { Statistics } from "./statistics.entity";
import { StatisticsService } from "./statistics.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Statistics])],
  controllers: [StatisticsController],
  providers: [StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule {}
