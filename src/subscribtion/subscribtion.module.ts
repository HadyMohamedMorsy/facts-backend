import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { SubscribtionController } from "./subscribtion.controller";
import { Subscribe } from "./subscribtion.entity";
import { SubscribtionService } from "./subscribtion.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Subscribe])],
  controllers: [SubscribtionController],
  providers: [SubscribtionService],
  exports: [SubscribtionService],
})
export class SubscribtionModule {}
