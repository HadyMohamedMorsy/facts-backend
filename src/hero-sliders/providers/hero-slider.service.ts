import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { Repository } from "typeorm";
import { CreateHeroSliderDto } from "../dtos/create-hero-slider.dto";
import { PatchHeroSliderDto } from "../dtos/patch-hero-slider.dto";
import { HeroSlider } from "../hero-slider.entity";

@Injectable()
export class HeroSliderService extends BaseService<
  HeroSlider,
  CreateHeroSliderDto,
  PatchHeroSliderDto
> {
  constructor(
    @InjectRepository(HeroSlider)
    repository: Repository<HeroSlider>,
    protected readonly apiService: APIFeaturesService,
  ) {
    super(repository, apiService);
  }
}
