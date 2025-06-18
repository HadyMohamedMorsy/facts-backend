import { Body, Controller, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { RelationOptions, SelectOptions } from "src/shared/interface/query.interface";
import { ApplicantEducation } from "./applicant-education.entity";
import { CreateApplicantEducationtDto } from "./dtos/create-applicants-education";
import { PatchApplicantEducationDto } from "./dtos/patch-applicants-education.dto";
import { ApplicantEducationService } from "./providers/applicants-education.service";

@Controller("applicant-education")
export class ApplicantEducationController
  extends BaseController<
    ApplicantEducation,
    CreateApplicantEducationtDto,
    PatchApplicantEducationDto
  >
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: ApplicantEducationService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      is_active: true,
      created_at: true,
      updated_at: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      created_by: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
      education: {
        id: true,
        title_en: true,
        title_ar: true,
      },
    };
  }

  @Post("/store")
  public create(@Body() create: CreateApplicantEducationtDto) {
    return this.service.create(
      {
        education: create.education,
        created_by: create.created_by,
        is_active: create.is_active,
      } as CreateApplicantEducationtDto,
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  public update(@Body() update: PatchApplicantEducationDto) {
    const updateData: PatchApplicantEducationDto = {
      id: update.id,
      education: update.education,
      is_active: update.is_active,
    };

    return this.service.update(updateData, this.selectOptions(), this.getRelationOptions());
  }
}
