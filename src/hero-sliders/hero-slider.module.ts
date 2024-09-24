import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { HeroSlider } from "./hero-slider.entity";
import { HeroSliderService } from "./providers/hero-slider.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([HeroSlider])],
  controllers: [],
  providers: [HeroSliderService],
})
export class HeroSliderModule {}
