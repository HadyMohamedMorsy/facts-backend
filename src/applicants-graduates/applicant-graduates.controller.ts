import { Body, Controller, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { RelationOptions, SelectOptions } from "src/shared/interface/query.interface";
import { ApplicantGraduates } from "./applicant-graduates.entity";
import { CreateApplicantGraduatesDto } from "./dtos/create-applicants-graduates";
import { PatchApplicantGraduatesDto } from "./dtos/patch-applicants-graduates.dto";
import { ApplicantGraduatesService } from "./providers/applicants-graduates.service";

@Controller("applicant-graduates")
export class ApplicantGraduatesController
  extends BaseController<
    ApplicantGraduates,
    CreateApplicantGraduatesDto,
    PatchApplicantGraduatesDto
  >
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: ApplicantGraduatesService) {
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
      graduate: {
        id: true,
        title_en: true,
        title_ar: true,
      },
    };
  }

  @Post("/store")
  public create(@Body() create: CreateApplicantGraduatesDto) {
    return this.service.create(create);
  }

  @Put("/update")
  public update(@Body() update: PatchApplicantGraduatesDto) {
    const updateData: PatchApplicantGraduatesDto = {
      id: update.id,
      graduate: update.graduate,
      is_active: update.is_active,
    };

    return this.service.update(updateData, this.selectOptions(), this.getRelationOptions());
  }
}
