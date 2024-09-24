import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { Repository } from "typeorm";
import { CreateHeroSliderDto } from "../dtos/create-hero-slider.dto";
import { HeroSlider } from "../hero-slider.entity";

@Injectable()
export class HeroSliderService {
  constructor(
    @InjectRepository(HeroSlider)
    private readonly repository: Repository<HeroSlider>,
    private readonly filterData: FilterDataProvider<HeroSlider>,
  ) {}

  public async create(create: CreateHeroSliderDto) {
    const data = this.repository.create(create);
    return await this.repository.save(data);
  }

  public async findAll(filter: FilterQueryDto) {
    const entity = await this.filterData
      .initRepositry("magazine", this.repository, filter)
      .filter()
      .provideFields()
      .sort()
      .paginate()
      .search()
      .execute();
    return entity;
  }

  public async delete(id: number) {
    await this.repository.delete(id);
    return { deleted: true, id };
  }
}
