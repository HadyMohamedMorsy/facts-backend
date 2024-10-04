import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { BannerController } from "./banner.controller";
import { Banner } from "./banner.entity";
import { BannerService } from "./providers/banner.service";

@Module({
  imports: [UsersModule, FilterDateModule, TypeOrmModule.forFeature([Banner])],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
