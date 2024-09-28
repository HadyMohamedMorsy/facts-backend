import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LanguagesModule } from "src/languages/languages.module";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { HeroSliderController } from "./hero-slider.controller";
import { HeroSlider } from "./hero-slider.entity";
import { HeroSliderService } from "./providers/hero-slider.service";

@Module({
  imports: [UsersModule, LanguagesModule, FilterDateModule, TypeOrmModule.forFeature([HeroSlider])],
  controllers: [HeroSliderController],
  providers: [HeroSliderService],
})
export class HeroSliderModule {}
