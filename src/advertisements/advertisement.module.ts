import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { AdvertisementController } from "./advertisement.controller";
import { Advertisement } from "./advertisement.entity";
import { AdvertisementService } from "./advertisement.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Advertisement])],
  controllers: [AdvertisementController],
  providers: [AdvertisementService],
})
export class AdvertisementModule {}
