import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { TabController } from "./tab.controller";
import { Tab } from "./tab.entity";
import { TabService } from "./tab.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Tab])],
  controllers: [TabController],
  providers: [TabService],
  exports: [TabService],
})
export class TabModule {}
