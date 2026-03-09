import { Body, Controller, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { Banner } from "./banner.entity";
import { BannerService } from "./banner.service";
import { CreateBannerDto } from "./dtos/create-banner.dto";
import { PatchBannerDto } from "./dtos/patch-banner.dto";

@Controller("banner")
export class BannerController
  extends BaseController<Banner, CreateBannerDto, PatchBannerDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: BannerService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      content: true,
      page: true,
      featuredImage: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {};
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async create(@Body() create: CreateBannerDto) {
    return await this.service.create(
      {
        content: create.content,
        page: create.page,
        featuredImage: create.featuredImage,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchBannerDto) {
    return await this.service.update(
      {
        id: update.id,
        content: update.content,
        page: update.page,
        featuredImage: update.featuredImage,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
