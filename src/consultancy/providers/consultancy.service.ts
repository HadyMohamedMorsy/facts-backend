import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/common/base/base.service";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { UserService } from "src/users/providers/user.service";
import { Repository } from "typeorm";
import { Consultancy } from "../consultancy.entity";
import { CreateConsultancyDto } from "../dtos/create-consultancy.dto";

@Injectable()
export class ConsultancyService extends BaseService<Consultancy, CreateConsultancyDto> {
  constructor(
    @InjectRepository(Consultancy)
    repository: Repository<Consultancy>,
    filterData: FilterDataProvider<Consultancy>,
    usersService: UserService,
  ) {
    super(repository, filterData, usersService);
  }

  async front(filter: FilterQueryDto) {
    const entity = await this.filtersFront(filter, "consultancy").execute();
    return {
      data: entity,
    };
  }

  async findAll(filter: FilterQueryDto) {
    const entity = await this.filters(filter, "consultancy")
      .joinRelations("consultancy_accordion", [
        "accordion_title_en",
        "accordion_title_ar",
        "description_en",
        "description_ar",
      ])
      .provideFields(["featuredImage", "short_description_en", "short_description_ar"])
      .execute();
    const result = await this.filters(filter, "consultancy").count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }
}
