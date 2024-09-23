import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { Repository } from "typeorm";
import { Consultancy } from "../consultancy.entity";
import { CreateConsultancyDto } from "../dtos/create-consultancy.dto";

@Injectable()
export class ConsultancyService {
  constructor(
    @InjectRepository(Consultancy)
    private readonly repository: Repository<Consultancy>,
    private readonly filterData: FilterDataProvider<Consultancy>,
  ) {}

  public async create(create: CreateConsultancyDto) {
    const createEntity = this.repository.create({ ...create });
    return await this.repository.save(createEntity);
  }

  public async findAll(filter: FilterQueryDto) {
    const entity = await this.filterData
      .initRepositry("consultancy", this.repository, filter)
      .filter()
      .provideFields()
      .sort()
      .paginate()
      .search()
      .joinRelations(["consultancyAccordion"])
      .execute();
    return entity;
  }

  public async delete(id: number) {
    await this.repository.delete(id);
    return { deleted: true, id };
  }
}
