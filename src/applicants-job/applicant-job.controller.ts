import { Body, Controller, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Auth } from "src/shared/decorators/auth.decorator";
import { AuthType } from "src/shared/enum/global-enum";
import { RelationOptions, SelectOptions } from "src/shared/interface/query.interface";
import { ApplicantJob } from "./applicant-job.entity";
import { CreateApplicantJobstDto } from "./dtos/create-applicants-job";
import { PatchApplicantJobsDto } from "./dtos/patch-applicants-job.dto";
import { ApplicantJobsService } from "./providers/applicants-job.service";

@Controller("applicant-Job")
export class ApplicantJobController
  extends BaseController<ApplicantJob, CreateApplicantJobstDto, PatchApplicantJobsDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: ApplicantJobsService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      created_by: true,
      job: true,
      attachment: true,
      is_active: true,
      created_at: true,
      updated_at: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      created_by: {
        select: ["id", "firstName", "lastName", "email"],
      },
      job: {
        select: ["id", "title_en", "title_ar", "description_en", "description_ar"],
      },
    };
  }

  @Post("/store")
  @Auth(AuthType.None)
  public async create(@Body() createDto: CreateApplicantJobstDto) {
    return this.service.create(
      {
        created_by: createDto.created_by,
        job: createDto.job,
        attachment: createDto.attachment,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  public async update(@Body() updateDto: PatchApplicantJobsDto) {
    return this.service.update(
      {
        id: updateDto.id,
        created_by: updateDto.created_by,
        job: updateDto.job,
        attachment: updateDto.attachment,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
