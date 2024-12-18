import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/common/base/base.service";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { UserService } from "src/users/providers/user.service";
import { Repository } from "typeorm";
import { CreateGallarysDto } from "../dtos/create-gallary.dto";
import { Gallary } from "../gallary.entity";

@Injectable()
export class GallaryService extends BaseService<Gallary, CreateGallarysDto> {
  constructor(
    @InjectRepository(Gallary)
    repository: Repository<Gallary>,
    filterData: FilterDataProvider<Gallary>,
    usersService: UserService,
  ) {
    super(repository, filterData, usersService);
  }

  async front(filter: FilterQueryDto) {
    const entity = await this.filtersFront(filter, "gallary")
      .filterByActive()
      .orderByOrder()
      .execute();
    return {
      data: entity,
    };
  }

  async findAll(filter: FilterQueryDto) {
    const entity = await this.filters(filter, "gallary")
      .orderByOrder()
      .provideFields(["files"])
      .execute();
    const result = await this.filters(filter, "gallary").count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }
}
