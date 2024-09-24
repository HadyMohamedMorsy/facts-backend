import { Body, Controller, Post } from "@nestjs/common";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { CreateHeroSliderDto } from "./dtos/create-hero-slider.dto";
import { HeroSliderService } from "./providers/hero-slider.service";

@Controller("magazine")
export class HeroSliderController {
  constructor(private readonly heroSliderService: HeroSliderService) {}

  @Post("/index")
  public index(@Body() filterQueryDto: FilterQueryDto) {
    return this.heroSliderService.findAll(filterQueryDto);
  }

  @Post("/store")
  public create(@Body() create: CreateHeroSliderDto) {
    return this.heroSliderService.create(create);
  }

  @Post("/delete")
  public delete(@Body() id: number) {
    return this.heroSliderService.delete(id);
  }
}
