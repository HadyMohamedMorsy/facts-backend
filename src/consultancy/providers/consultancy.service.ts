import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterDataProvider } from "src/common/filter/providers/filter-data.provider";
import { Repository } from "typeorm";
import { FilterQueryDto } from "../../common/filter/dtos/filter.dto";
import { Consultancy } from "../consultancy.entity";
import { CreateConsultancyDto } from "../dtos/create-consultancy.dto";

@Injectable()
export class ConsultancyService {
  constructor(
    @InjectRepository(Consultancy)
    private readonly consultancyRepository: Repository<Consultancy>,
    private readonly filterData: FilterDataProvider<Consultancy>,
  ) {}

  public async create(createConsultancyDto: CreateConsultancyDto) {
    const consultancy = this.consultancyRepository.create({ ...createConsultancyDto });
    return await this.consultancyRepository.save(consultancy);
  }

  public async findAll(filter: FilterQueryDto) {
    const consultancy = await this.filterData
      .initRepositry("consultancy", this.consultancyRepository, filter)
      .filter()
      .provideFields()
      .sort()
      .paginate()
      .search()
      .joinRelations(["consultancyAccordion"])
      .execute();
    return consultancy;
  }

  public async delete(id: number) {
    await this.consultancyRepository.delete(id);
    return { deleted: true, id };
  }
}
