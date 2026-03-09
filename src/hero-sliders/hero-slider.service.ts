import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { HeroSlider } from "./hero-slider.entity";
import { CreateHeroSliderDto } from "./dtos/create-hero-slider.dto";
import { PatchHeroSliderDto } from "./dtos/patch-hero-slider.dto";

@Injectable()
export class HeroSliderService
  extends BaseService<HeroSlider, CreateHeroSliderDto, PatchHeroSliderDto>
  implements ICrudService<HeroSlider, CreateHeroSliderDto, PatchHeroSliderDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(HeroSlider)
    repository: Repository<HeroSlider>,
  ) {
    super(repository, apiFeaturesService);
  }
}
