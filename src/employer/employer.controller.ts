import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Auth } from "src/shared/decorators/auth.decorator";
import { Roles } from "src/shared/decorators/roles.decorator";
import { AuthType } from "src/shared/enum/global-enum";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { Employer } from "./employer.entity";
import { EmployerService } from "./employer.service";
import { CreateEmployerDto } from "./dtos/create-employer.dto";
import { PatchEmployerDto } from "./dtos/patch-employer.dto";

@Controller("employer")
export class EmployerController
  extends BaseController<Employer, CreateEmployerDto, PatchEmployerDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: EmployerService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      companyName: true,
      businessType: true,
      industry: true,
      isActive: true,
      companyAddress: true,
      companyPhone: true,
      companyEmail: true,
      websiteUrl: true,
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
    };
  }

  @Post("/store")
  @Auth(AuthType.None)
  public async create(@Body() create: CreateEmployerDto, @Req() req: Request) {
    return await this.service.create(
      {
        createdBy: req["createdBy"],
        companyName: create.companyName,
        businessType: create.businessType,
        industry: create.industry,
        companyAddress: create.companyAddress,
        companyPhone: create.companyPhone,
        companyEmail: create.companyEmail,
        websiteUrl: create.websiteUrl,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchEmployerDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        createdBy: req["createdBy"],
        companyName: update.companyName,
        businessType: update.businessType,
        industry: update.industry,
        isActive: update.isActive,
        companyAddress: update.companyAddress,
        companyPhone: update.companyPhone,
        companyEmail: update.companyEmail,
        websiteUrl: update.websiteUrl,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
