import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { BannerController } from "./banner.controller";
import { Banner } from "./banner.entity";
import { BannerService } from "./providers/banner.service";

@Module({
  imports: [TypeOrmModule.forFeature([Banner])],
  controllers: [BannerController],
  providers: [BannerService, APIFeaturesService],
})
export class BannerModule {}
