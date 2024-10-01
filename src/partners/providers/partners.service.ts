import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LanguageService } from "src/languages/providers/language.service";
import { BaseService } from "src/shared/common/base/base.service";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { UserService } from "src/users/providers/user.service";
import { Repository } from "typeorm";
import { CreatePartnersDto } from "../dtos/create-partners.dto";
import { Partner } from "../partner.entity";

@Injectable()
export class PartnersService extends BaseService<Partner, CreatePartnersDto> {
  constructor(
    @InjectRepository(Partner)
    repository: Repository<Partner>,
    filterData: FilterDataProvider<Partner>,
    usersService: UserService,
    languageService: LanguageService,
  ) {
    super(repository, filterData, usersService, languageService);
  }

  async findAll(filter: FilterQueryDto) {
    const entity = await this.filters(filter, "partner").execute();
    const result = await this.filters(filter, "partner").count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }

  async front(filter: FilterQueryDto) {
    const entity = await this.filtersFront(filter, "partner").execute();
    return {
      data: entity,
    };
  }
}
