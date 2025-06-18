import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { Repository } from "typeorm";
import { ApplicantEducation } from "../applicant-education.entity";
import { CreateApplicantEducationtDto } from "../dtos/create-applicants-education";
import { PatchApplicantEducationDto } from "../dtos/patch-applicants-education.dto";

@Injectable()
export class ApplicantEducationService extends BaseService<
  ApplicantEducation,
  CreateApplicantEducationtDto,
  PatchApplicantEducationDto
> {
  constructor(
    @InjectRepository(ApplicantEducation)
    protected readonly repository: Repository<ApplicantEducation>,
    protected readonly apiService: APIFeaturesService,
  ) {
    super(repository, apiService);
  }
}
