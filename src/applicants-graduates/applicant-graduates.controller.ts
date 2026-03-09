import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { ApplicantGraduates } from "./applicant-graduates.entity";
import { ApplicantGraduatesService } from "./applicant-graduates.service";
import { CreateApplicantGraduatesDto } from "./dtos/create-applicant-graduates.dto";
import { PatchApplicantGraduatesDto } from "./dtos/patch-applicant-graduates.dto";

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
      isActive: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      createdBy: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
      graduate: {
        id: true,
        type: true,
        slug: true,
        course_name: true,
      },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async create(@Body() create: CreateApplicantGraduatesDto, @Req() req: Request) {
    return await this.service.create(
      {
        createdBy: req["createdBy"],
        graduate: req["graduate"],
        isActive: create.isActive ?? false,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchApplicantGraduatesDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        createdBy: req["createdBy"],
        graduate: req["graduate"],
        isActive: update.isActive,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
