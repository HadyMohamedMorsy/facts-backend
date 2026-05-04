import { Body, Controller, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { Advertisement } from "./advertisement.entity";
import { CreatAdvertisementDto } from "./dtos/create-advertisements.dto";
import { PatchAdvertisementDto } from "./dtos/patch-advertisements.dto";
import { AdvertisementService } from "./advertisement.service";

@Controller("advertisement")
export class AdvertisementController
  extends BaseController<Advertisement, CreatAdvertisementDto, PatchAdvertisementDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: AdvertisementService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      content: true,
      page: true,
      link: true,
      featuredImage: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {};
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async create(@Body() create: CreatAdvertisementDto) {
    return await this.service.create(
      {
        content: create.content,
        page: create.page,
        link: create.link,
        featuredImage: create.featuredImage,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchAdvertisementDto) {
    return await this.service.update(
      {
        id: update.id,
        content: update.content,
        page: update.page,
        link: update.link,
        featuredImage: update.featuredImage,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
