import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/common/base/base.service";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { UserService } from "src/users/providers/user.service";
import { Repository } from "typeorm";
import { CreateSettingDto } from "../dtos/create-setting.dto";
import { Settings } from "../setting.entity";

@Injectable()
export class SettingsService extends BaseService<Settings, CreateSettingDto> {
  constructor(
    @InjectRepository(Settings)
    repository: Repository<Settings>,
    filterData: FilterDataProvider<Settings>,
    usersService: UserService,
  ) {
    super(repository, filterData, usersService);
  }

  async front(filter: FilterQueryDto) {
    const entity = await this.filtersFront(filter, "settings")
      .filterByActive()
      .orderByOrder()
      .execute();
    return {
      data: entity,
    };
  }

  async findAll(filter: FilterQueryDto) {
    const entity = await this.filters(filter, "settings")
      .provideFields([
        "order",
        "featuredImage",
        "short_description_ar",
        "short_description_en",
        "description_ar",
        "description_en",
        "title_en",
        "title_ar",
        "link",
        "icon",
      ])
      .orderByOrder()
      .execute();
    const result = await this.filters(filter, "settings").count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }
}
