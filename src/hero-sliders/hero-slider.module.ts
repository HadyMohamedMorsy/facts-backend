import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { HeroSliderController } from "./hero-slider.controller";
import { HeroSlider } from "./hero-slider.entity";
import { HeroSliderService } from "./providers/hero-slider.service";

@Module({
  imports: [UsersModule, FilterDateModule, TypeOrmModule.forFeature([HeroSlider])],
  controllers: [HeroSliderController],
  providers: [HeroSliderService],
})
export class HeroSliderModule {}
