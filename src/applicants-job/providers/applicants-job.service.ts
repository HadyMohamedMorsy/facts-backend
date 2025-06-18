import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { Repository } from "typeorm";
import { ApplicantJob } from "../applicant-job.entity";
import { CreateApplicantJobstDto } from "../dtos/create-applicants-job";
import { PatchApplicantJobsDto } from "../dtos/patch-applicants-job.dto";

@Injectable()
export class ApplicantJobsService extends BaseService<
  ApplicantJob,
  CreateApplicantJobstDto,
  PatchApplicantJobsDto
> {
  constructor(
    @InjectRepository(ApplicantJob)
    repository: Repository<ApplicantJob>,
    protected readonly apiService: APIFeaturesService,
  ) {
    super(repository, apiService);
  }
}
