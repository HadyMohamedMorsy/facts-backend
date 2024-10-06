import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { Repository } from "typeorm";
import { ApplicantJob } from "../applicant-job.entity";
import { CreateApplicantJobstDto } from "../dtos/create-applicants-job";

@Injectable()
export class ApplicantJobsService {
  constructor(
    @InjectRepository(ApplicantJob)
    private readonly repository: Repository<ApplicantJob>,
    private readonly filterData: FilterDataProvider<ApplicantJob>,
  ) {}

  public async findAll(filter: FilterQueryDto) {
    const entity = await this.filterData
      .initRepositry("applicantjob", this.repository, filter)
      .filter()
      .sort()
      .paginate()
      .joinRelations("created_by", ["email"])
      .joinRelations("job", ["title_en", "title_ar"])
      .search()
      .execute();

    const result = await this.filterData
      .initRepositry("applicantjob", this.repository, filter)
      .count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }

  async create(createDto: CreateApplicantJobstDto) {
    const entity = this.repository.create(createDto as any);
    return this.repository.save(entity);
  }

  public async delete(id: number) {
    await this.repository.delete(id);
    return { deleted: true, id };
  }
}
