import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { SubscribtionService } from "./providers/subscribtion.service";
import { SubscribtionController } from "./subscribtion.controller";
import { Subscribe } from "./subscribtion.entity";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Subscribe])],
  controllers: [SubscribtionController],
  providers: [SubscribtionService],
})
export class SubscribtionModule {}
