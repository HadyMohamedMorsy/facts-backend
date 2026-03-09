import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { Partner } from "./partner.entity";
import { PartnerService } from "./partner.service";
import { CreatePartnerDto } from "./dtos/create-partner.dto";
import { PatchPartnerDto } from "./dtos/patch-partner.dto";

@Controller("partner")
export class PartnersController
  extends BaseController<Partner, CreatePartnerDto, PatchPartnerDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: PartnerService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      content: true,
      link: true,
      featuredImage: true,
      orderIndex: true,
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
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async create(@Body() create: CreatePartnerDto, @Req() req: Request) {
    return await this.service.create(
      {
        createdBy: req["createdBy"],
        content: create.content,
        link: create.link,
        featuredImage: create.featuredImage,
        orderIndex: create.orderIndex,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchPartnerDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        createdBy: req["createdBy"],
        content: update.content,
        link: update.link,
        featuredImage: update.featuredImage,
        orderIndex: update.orderIndex,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
