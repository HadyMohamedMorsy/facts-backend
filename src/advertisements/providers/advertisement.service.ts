import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/common/base/base.service";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { UserService } from "src/users/providers/user.service";
import { Repository } from "typeorm";
import { Advertisement } from "../advertisement.entity";
import { CreatAdvertisementDto } from "../dtos/create-advertisements.dto";

@Injectable()
export class AdvertisementService extends BaseService<Advertisement, CreatAdvertisementDto> {
  constructor(
    @InjectRepository(Advertisement)
    repository: Repository<Advertisement>,
    filterData: FilterDataProvider<Advertisement>,
    usersService: UserService,
  ) {
    super(repository, filterData, usersService);
  }

  async front(filter: FilterQueryDto) {
    const entity = await this.filtersFront(filter, "advertisement")
      .filterByActive()
      .orderByOrder()
      .execute();
    return {
      data: entity,
    };
  }

  async findAll(filter: FilterQueryDto) {
    const entity = await this.filters(filter, "advertisement")
      .provideFields(["featuredImage"])
      .orderByOrder()
      .execute();
    const result = await this.filters(filter, "advertisement").count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }
}
