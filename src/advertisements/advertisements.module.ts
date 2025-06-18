import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { AdvertisementController } from "./advertisement.controller";
import { Advertisement } from "./advertisement.entity";
import { AdvertisementService } from "./providers/advertisement.service";

@Module({
  imports: [TypeOrmModule.forFeature([Advertisement])],
  controllers: [AdvertisementController],
  providers: [AdvertisementService, APIFeaturesService],
})
export class AdvertisementsModule {}
