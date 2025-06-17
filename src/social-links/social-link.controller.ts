import { Body, Controller, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { RelationOptions, SelectOptions } from "src/shared/interface/query.interface";
import { CreateSocialLinkDto } from "./dtos/create-social-link";
import { PatchSocialLinkDto } from "./dtos/patch-social-link.dto";
import { SocialLinkService } from "./providers/social-link.service";
import { SocialLink } from "./social-link.entity";

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
      order: true,
      is_active: true,
      created_at: true,
      updated_at: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      createdBy: {
        id: true,
        firstName: true,
        lastName: true,
      },
    };
  }

  @Post("/store")
  public create(@Body() create: CreateSocialLinkDto) {
    return this.service.create(
      {
        icon: create.icon,
        link: create.link,
        order: create.order,
      } as CreateSocialLinkDto,
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  public update(@Body() update: PatchSocialLinkDto) {
    const updateData: PatchSocialLinkDto = {
      id: update.id,
      icon: update.icon,
      link: update.link,
      order: update.order,
    };

    return this.service.update(updateData, this.selectOptions(), this.getRelationOptions());
  }
}
