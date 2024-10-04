import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { Repository } from "typeorm";
import { Applicant } from "../applicant.entity";
import { CreateApplicantstDto } from "../dtos/create-applicants";

@Injectable()
export class ApplicantsService {
  constructor(
    @InjectRepository(Applicant)
    private readonly repository: Repository<Applicant>,
    private readonly filterData: FilterDataProvider<Applicant>,
  ) {}

  public async findAll(filter: FilterQueryDto) {
    const entity = await this.filterData
      .initRepositry("applicant", this.repository, filter)
      .filter()
      .sort()
      .paginate()
      .search()
      .execute();
    return entity;
  }

  async create(createDto: CreateApplicantstDto) {
    const entity = this.repository.create(createDto as any);
    return this.repository.save(entity);
  }

  public async delete(id: number) {
    await this.repository.delete(id);
    return { deleted: true, id };
  }
}
