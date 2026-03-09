import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { ApplicantJob } from "./applicant-job.entity";
import { ApplicantJobService } from "./applicant-job.service";
import { CreateApplicantJobDto } from "./dtos/create-applicant-job.dto";
import { PatchApplicantJobDto } from "./dtos/patch-applicant-job.dto";

@Controller("applicant-job")
export class ApplicantJobController
  extends BaseController<ApplicantJob, CreateApplicantJobDto, PatchApplicantJobDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: ApplicantJobService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      isActive: true,
      attachment: true,
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
      job: {
        id: true,
        title_en: true,
        title_ar: true,
        type: true,
      },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async create(@Body() create: CreateApplicantJobDto, @Req() req: Request) {
    return await this.service.create(
      {
        createdBy: req["createdBy"],
        job: req["job"],
        attachment: create.attachment,
        isActive: create.isActive ?? false,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchApplicantJobDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        createdBy: req["createdBy"],
        job: req["job"],
        attachment: update.attachment,
        isActive: update.isActive,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
