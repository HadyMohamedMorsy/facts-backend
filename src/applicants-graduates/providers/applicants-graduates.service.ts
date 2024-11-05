import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { Repository } from "typeorm";
import { ApplicantGraduates } from "../applicant-graduates.entity";
import { CreateApplicantGraduatesDto } from "../dtos/create-applicants-graduates";

@Injectable()
export class ApplicantGraduatesService {
  constructor(
    @InjectRepository(ApplicantGraduates)
    private readonly repository: Repository<ApplicantGraduates>,
    private readonly filterData: FilterDataProvider<ApplicantGraduates>,
  ) {}

  public async findAll(filter: FilterQueryDto) {
    const entity = await this.filterData
      .initRepositry("applicantgraduates", this.repository, filter)
      .filter()
      .sort()
      .paginate()
      .joinRelations("graduate", ["id"])
      .joinRelations("created_by", ["email"])
      .search()
      .execute();

    const result = await this.filterData
      .initRepositry("applicantgraduates", this.repository, filter)
      .count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }

  async create(createDto: CreateApplicantGraduatesDto) {
    const entity = this.repository.create(createDto as any);
    return this.repository.save(entity);
  }

  public async delete(id: number) {
    await this.repository.delete(id);
    return { deleted: true, id };
  }
}
