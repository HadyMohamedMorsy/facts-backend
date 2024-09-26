import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/common/base/base.service";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { Repository } from "typeorm";
import { Consultancy } from "../consultancy.entity";
import { CreateConsultancyDto } from "../dtos/create-consultancy.dto";

@Injectable()
export class ConsultancyService extends BaseService<Consultancy, CreateConsultancyDto> {
  constructor(
    @InjectRepository(Consultancy)
    repository: Repository<Consultancy>,
    filterData: FilterDataProvider<Consultancy>,
  ) {
    super(repository, filterData);
  }

  async findAll(filter: FilterQueryDto) {
    const entity = await this.filters(filter, "consultancy")
      .joinRelations(["consultancyAccordion"])
      .execute();
    const result = await this.filters(filter, "consultancy").count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }
}
