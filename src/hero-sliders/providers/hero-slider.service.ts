import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LanguageService } from "src/languages/providers/language.service";
import { BaseService } from "src/shared/common/base/base.service";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { UserService } from "src/users/providers/user.service";
import { Repository } from "typeorm";
import { CreateHeroSliderDto } from "../dtos/create-hero-slider.dto";
import { HeroSlider } from "../hero-slider.entity";

@Injectable()
export class HeroSliderService extends BaseService<HeroSlider, CreateHeroSliderDto> {
  constructor(
    @InjectRepository(HeroSlider)
    repository: Repository<HeroSlider>,
    filterData: FilterDataProvider<HeroSlider>,
    usersService: UserService,
    languageService: LanguageService,
  ) {
    super(repository, filterData, usersService, languageService);
  }

  async findAll(filter: FilterQueryDto) {
    const entity = await this.filters(filter, "heroslider")
      .provideFields(["featuredImage", "short_description"])
      .execute();
    const result = await this.filters(filter, "heroslider").count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }
}
