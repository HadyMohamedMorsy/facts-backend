import { Body, Controller, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { RelationOptions, SelectOptions } from "src/shared/interface/query.interface";
import { Banner } from "./banner.entity";
import { CreateBannerDto } from "./dtos/create-banner.dto";
import { PatchBannerDto } from "./dtos/patch-banner.dto";
import { BannerService } from "./providers/banner.service";

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
      title_en: true,
      title_ar: true,
      page: true,
      short_description_en: true,
      short_description_ar: true,
      featuredImage: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      created_by: {
        id: true,
        firstName: true,
        lastName: true,
      },
    };
  }

  @Post("/store")
  public create(@Body() create: CreateBannerDto) {
    return this.service.create(
      {
        title_en: create.title_en,
        title_ar: create.title_ar,
        page: create.page,
        short_description_en: create.short_description_en,
        short_description_ar: create.short_description_ar,
        featuredImage: create.featuredImage,
        created_by: create.created_by,
      } as CreateBannerDto,
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  public update(@Body() update: PatchBannerDto) {
    const updateData: PatchBannerDto = {
      id: update.id,
      title_en: update.title_en,
      title_ar: update.title_ar,
      page: update.page,
      short_description_en: update.short_description_en,
      short_description_ar: update.short_description_ar,
      featuredImage: update.featuredImage,
    };

    return this.service.update(updateData, this.selectOptions(), this.getRelationOptions());
  }
}
