import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/common/base/base.service";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { UserService } from "src/users/providers/user.service";
import { Repository } from "typeorm";
import { CreateProfiletDto } from "../dtos/create-profile";
import { Profile } from "../profile.entity";

@Injectable()
export class ProfileService extends BaseService<Profile, CreateProfiletDto> {
  constructor(
    @InjectRepository(Profile)
    repository: Repository<Profile>,
    filterData: FilterDataProvider<Profile>,
    usersService: UserService,
  ) {
    super(repository, filterData, usersService);
  }

  async front(filter: FilterQueryDto) {
    const entity = await this.filtersFront(filter, "profile").execute();
    return {
      data: entity,
    };
  }

  async findAll(filter: FilterQueryDto) {
    const entity = await this.filterData
      .initRepositry("profile", this.repository, filter)
      .filter()
      .sort()
      .paginate()
      .search()
      .joinRelations("created_by", ["email"])
      .execute();
    const result = await this.filters(filter, "profile").count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }
}
