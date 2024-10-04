import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { AdvertisementServiceController } from "./advertisement.controller";
import { Advertisement } from "./advertisement.entity";
import { AdvertisementService } from "./providers/advertisement.service";

@Module({
  imports: [UsersModule, FilterDateModule, TypeOrmModule.forFeature([Advertisement])],
  controllers: [AdvertisementServiceController],
  providers: [AdvertisementService],
})
export class AdvertisementsModule {}
