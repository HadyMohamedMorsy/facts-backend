import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { StatisticsService } from "./providers/statistics.service";
import { StatisticsController } from "./statistics.controller";
import { Statistics } from "./statistics.entity";

@Module({
  imports: [UsersModule, FilterDateModule, TypeOrmModule.forFeature([Statistics])],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
