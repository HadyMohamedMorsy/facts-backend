import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { ApplicantEducation } from "./applicant-education.entity";
import { ApplicantEducationService } from "./applicant-education.service";
import { CreateApplicantEducationDto } from "./dtos/create-applicant-education.dto";
import { PatchApplicantEducationDto } from "./dtos/patch-applicant-education.dto";

@Controller("applicant-education")
export class ApplicantEducationController
  extends BaseController<
    ApplicantEducation,
    CreateApplicantEducationDto,
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
      education: {
        id: true,
        content: true,
        slug: true,
      },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async create(@Body() create: CreateApplicantEducationDto, @Req() req: Request) {
    return await this.service.create(
      {
        createdBy: req["createdBy"],
        education: req["education"],
        isActive: create.isActive ?? false,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchApplicantEducationDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        isActive: update.isActive,
        education: req["education"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
