import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { Repository } from "typeorm";
import { ApplicantGraduates } from "../applicant-graduates.entity";
import { CreateApplicantGraduatesDto } from "../dtos/create-applicants-graduates";
import { PatchApplicantGraduatesDto } from "../dtos/patch-applicants-graduates.dto";

@Injectable()
export class ApplicantGraduatesService extends BaseService<
  ApplicantGraduates,
  CreateApplicantGraduatesDto,
  PatchApplicantGraduatesDto
> {
  constructor(
    @InjectRepository(ApplicantGraduates)
    protected readonly repository: Repository<ApplicantGraduates>,
    protected readonly apiService: APIFeaturesService,
  ) {
    super(repository, apiService);
  }
}
