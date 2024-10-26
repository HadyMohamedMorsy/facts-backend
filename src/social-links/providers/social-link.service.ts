import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/common/base/base.service";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { UserService } from "src/users/providers/user.service";
import { Repository } from "typeorm";
import { CreateSocialLinkDto } from "../dtos/create-social-link";
import { SocialLink } from "../social-link.entity";

@Injectable()
export class SocialLinkService extends BaseService<SocialLink, CreateSocialLinkDto> {
  constructor(
    @InjectRepository(SocialLink)
    repository: Repository<SocialLink>,
    filterData: FilterDataProvider<SocialLink>,
    usersService: UserService,
  ) {
    super(repository, filterData, usersService);
  }

  async front(filter: FilterQueryDto) {
    const entity = await this.filtersFront(filter, "sociallink")
      .filterByActive()
      .orderByOrder()
      .execute();
    return {
      data: entity,
    };
  }

  async findAll(filter: FilterQueryDto) {
    const entity = await this.filters(filter, "sociallink")
      .provideFields(["icon"])
      .orderByOrder()
      .execute();
    const result = await this.filters(filter, "sociallink").count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }
}
