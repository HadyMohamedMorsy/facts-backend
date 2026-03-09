import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { ApplicantGraduates } from "./applicant-graduates.entity";
import { CreateApplicantGraduatesDto } from "./dtos/create-applicant-graduates.dto";
import { PatchApplicantGraduatesDto } from "./dtos/patch-applicant-graduates.dto";

@Injectable()
export class ApplicantGraduatesService
  extends BaseService<ApplicantGraduates, CreateApplicantGraduatesDto, PatchApplicantGraduatesDto>
  implements
    ICrudService<ApplicantGraduates, CreateApplicantGraduatesDto, PatchApplicantGraduatesDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(ApplicantGraduates)
    repository: Repository<ApplicantGraduates>,
  ) {
    super(repository, apiFeaturesService);
  }
}
