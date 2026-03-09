import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { ApplicantEducation } from "./applicant-education.entity";
import { CreateApplicantEducationDto } from "./dtos/create-applicant-education.dto";
import { PatchApplicantEducationDto } from "./dtos/patch-applicant-education.dto";

@Injectable()
export class ApplicantEducationService
  extends BaseService<
    ApplicantEducation,
    CreateApplicantEducationDto,
    PatchApplicantEducationDto
  >
  implements
    ICrudService<
      ApplicantEducation,
      CreateApplicantEducationDto,
      PatchApplicantEducationDto
    >
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(ApplicantEducation)
    repository: Repository<ApplicantEducation>,
  ) {
    super(repository, apiFeaturesService);
  }
}
