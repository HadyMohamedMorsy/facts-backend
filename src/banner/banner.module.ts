import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { BannerController } from "./banner.controller";
import { Banner } from "./banner.entity";
import { BannerService } from "./banner.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Banner])],
  controllers: [BannerController],
  providers: [BannerService],
  exports: [BannerService],
})
export class BannerModule {}
