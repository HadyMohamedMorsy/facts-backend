import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { Repository } from "typeorm";
import { ApplicantEducation } from "../applicant-education.entity";
import { CreateApplicantEducationtDto } from "../dtos/create-applicants-education";

@Injectable()
export class ApplicantEducationService {
  constructor(
    @InjectRepository(ApplicantEducation)
    private readonly repository: Repository<ApplicantEducation>,
    private readonly filterData: FilterDataProvider<ApplicantEducation>,
  ) {}

  public async findAll(filter: FilterQueryDto) {
    const entity = await this.filterData
      .initRepositry("applicanteducation", this.repository, filter)
      .filter()
      .sort()
      .paginate()
      .search()
      .joinRelations("created_by", ["email"])
      .joinRelations("education", ["title_en", "title_ar"])
      .execute();
    const result = await this.filterData
      .initRepositry("applicanteducation", this.repository, filter)
      .count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }

  async create(createDto: CreateApplicantEducationtDto) {
    const entity = this.repository.create(createDto as any);
    return this.repository.save(entity);
  }

  public async delete(id: number) {
    await this.repository.delete(id);
    return { deleted: true, id };
  }
}
