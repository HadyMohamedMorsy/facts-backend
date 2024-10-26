import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/common/base/base.service";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { UserService } from "src/users/providers/user.service";
import { Repository } from "typeorm";
import { ApplicantJob } from "../applicant-job.entity";
import { CreateApplicantJobstDto } from "../dtos/create-applicants-job";

@Injectable()
export class ApplicantJobsService extends BaseService<ApplicantJob, CreateApplicantJobstDto> {
  constructor(
    @InjectRepository(ApplicantJob)
    repository: Repository<ApplicantJob>,
    filterData: FilterDataProvider<ApplicantJob>,
    usersService: UserService,
  ) {
    super(repository, filterData, usersService);
  }

  async front(filter: FilterQueryDto) {
    const entity = await this.filtersFront(filter, "applicantjob").execute();
    return {
      data: entity,
    };
  }

  async findAll(filter: FilterQueryDto) {
    const entity = await this.filters(filter, "applicantjob")
      .joinRelations("job", ["title_en", "title_ar"])
      .execute();
    const result = await this.filters(filter, "applicantjob").count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }
}
