import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { HeroSliderController } from "./hero-slider.controller";
import { HeroSlider } from "./hero-slider.entity";
import { HeroSliderService } from "./hero-slider.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([HeroSlider])],
  controllers: [HeroSliderController],
  providers: [HeroSliderService],
  exports: [HeroSliderService],
})
export class HeroSliderModule {}
