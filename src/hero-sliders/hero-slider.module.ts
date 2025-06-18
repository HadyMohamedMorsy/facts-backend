import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { HeroSliderController } from "./hero-slider.controller";
import { HeroSlider } from "./hero-slider.entity";
import { HeroSliderService } from "./providers/hero-slider.service";

@Module({
  imports: [TypeOrmModule.forFeature([HeroSlider])],
  controllers: [HeroSliderController],
  providers: [HeroSliderService, APIFeaturesService],
})
export class HeroSliderModule {}
