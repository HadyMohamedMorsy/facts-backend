import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { Repository } from "typeorm";
import { CreateSettingDto } from "../dtos/create-setting.dto";
import { Settings } from "../setting.entity";

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private readonly repository: Repository<Settings>,
    private readonly filterData: FilterDataProvider<Settings>,
  ) {}

  public async create(create: CreateSettingDto) {
    const education = this.repository.create(create);
    return await this.repository.save(education);
  }

  public async findAll(filter: FilterQueryDto) {
    const entity = await this.filterData
      .initRepositry("setting", this.repository, filter)
      .filter()
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
