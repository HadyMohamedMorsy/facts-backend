import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Auth } from "src/shared/decorators/auth.decorator";
import { Roles } from "src/shared/decorators/roles.decorator";
import { AuthType, LOCATION } from "src/shared/enum/global-enum";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { Job } from "./job.entity";
import { JobService } from "./job.service";
import { CreateJobDto } from "./dtos/create-job.dto";
import { PatchJobDto } from "./dtos/patch-job.dto";

@Controller("job")
export class JobController
  extends BaseController<Job, CreateJobDto, PatchJobDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: JobService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      content: true,
      type: true,
      location: true,
      salary: true,
      featuredImage: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      createdBy: { id: true, firstName: true, lastName: true, email: true },
    };
  }

  @Post("/store")
  @Auth(AuthType.None)
  public async create(@Body() create: CreateJobDto, @Req() req: Request) {
    return await this.service.create(
      {
        createdBy: req["createdBy"],
        content: create.content,
        type: create.type,
        location: create.location ?? LOCATION.CAIRO,
        salary: create.salary,
        featuredImage: create.featuredImage,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchJobDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        createdBy: req["createdBy"],
        content: update.content,
        type: update.type,
        location: update.location,
        salary: update.salary,
        featuredImage: update.featuredImage,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
