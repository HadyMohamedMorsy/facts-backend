import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LanguageService } from "src/languages/providers/language.service";
import { BaseService } from "src/shared/common/base/base.service";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { UserService } from "src/users/providers/user.service";
import { Repository } from "typeorm";
import { Banner } from "../banner.entity";
import { CreateBannerDto } from "../dtos/create-banner.dto";

@Injectable()
export class BannerService extends BaseService<Banner, CreateBannerDto> {
  constructor(
    @InjectRepository(Banner)
    repository: Repository<Banner>,
    filterData: FilterDataProvider<Banner>,
    usersService: UserService,
    languageService: LanguageService,
  ) {
    super(repository, filterData, usersService, languageService);
  }

  async front(filter: FilterQueryDto) {
    const entity = await this.filtersFront(filter, "banner").execute();
    return {
      data: entity,
    };
  }

  async findAll(filter: FilterQueryDto) {
    const entity = await this.filters(filter, "banner")
      .provideFields(["featuredImage", "short_description"])
      .execute();
    const result = await this.filters(filter, "banner").count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }
}
