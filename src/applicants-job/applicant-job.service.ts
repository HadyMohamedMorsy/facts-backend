import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { ApplicantJob } from "./applicant-job.entity";
import { CreateApplicantJobDto } from "./dtos/create-applicant-job.dto";
import { PatchApplicantJobDto } from "./dtos/patch-applicant-job.dto";

@Injectable()
export class ApplicantJobService
  extends BaseService<ApplicantJob, CreateApplicantJobDto, PatchApplicantJobDto>
  implements ICrudService<ApplicantJob, CreateApplicantJobDto, PatchApplicantJobDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(ApplicantJob)
    repository: Repository<ApplicantJob>,
  ) {
    super(repository, apiFeaturesService);
  }
}
