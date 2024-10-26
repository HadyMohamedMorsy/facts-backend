import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/common/base/base.service";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { UserService } from "src/users/providers/user.service";
import { Repository } from "typeorm";
import { CreateStatisticsDto } from "../dtos/create-statistics.dto";
import { Statistics } from "../statistics.entity";

@Injectable()
export class StatisticsService extends BaseService<Statistics, CreateStatisticsDto> {
  constructor(
    @InjectRepository(Statistics)
    repository: Repository<Statistics>,
    filterData: FilterDataProvider<Statistics>,
    usersService: UserService,
  ) {
    super(repository, filterData, usersService);
  }

  async front(filter: FilterQueryDto) {
    const entity = await this.filtersFront(filter, "statistics")
      .filterByActive()
      .orderByOrder()
      .execute();
    return {
      data: entity,
    };
  }

  async findAll(filter: FilterQueryDto) {
    const entity = await this.filters(filter, "statistics")
      .provideFields(["icon"])
      .orderByOrder()
      .execute();
    const result = await this.filters(filter, "statistics").count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }
}
