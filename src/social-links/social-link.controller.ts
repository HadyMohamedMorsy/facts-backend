import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { SocialLink } from "./social-link.entity";
import { SocialLinkService } from "./social-link.service";
import { CreateSocialLinkDto } from "./dtos/create-social-link.dto";
import { PatchSocialLinkDto } from "./dtos/patch-social-link.dto";

@Controller("social-link")
export class SocialLinkController
  extends BaseController<SocialLink, CreateSocialLinkDto, PatchSocialLinkDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: SocialLinkService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      icon: true,
      link: true,
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
  public async create(@Body() create: CreateSocialLinkDto, @Req() req: Request) {
    return await this.service.create(
      {
        createdBy: req["createdBy"],
        icon: create.icon,
        link: create.link,
        orderIndex: create.orderIndex,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchSocialLinkDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        createdBy: req["createdBy"],
        icon: update.icon,
        link: update.link,
        orderIndex: update.orderIndex,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
