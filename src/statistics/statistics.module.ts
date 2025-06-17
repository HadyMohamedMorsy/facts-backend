import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { StatisticsService } from "./providers/statistics.service";
import { StatisticsController } from "./statistics.controller";
import { Statistics } from "./statistics.entity";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Statistics])],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
