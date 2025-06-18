import { Body, Controller, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { RelationOptions, SelectOptions } from "src/shared/interface/query.interface";
import { Advertisement } from "./advertisement.entity";
import { CreatAdvertisementDto } from "./dtos/create-advertisements.dto";
import { PatchBannerDto } from "./dtos/patch-advertisements.dto";
import { AdvertisementService } from "./providers/advertisement.service";

@Controller("advertisement")
export class AdvertisementController
  extends BaseController<Advertisement, CreatAdvertisementDto, PatchBannerDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: AdvertisementService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      company_name_en: true,
      company_name_ar: true,
      page: true,
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
  public create(@Body() create: CreatAdvertisementDto) {
    return this.service.create(
      {
        company_name_en: create.company_name_en,
        company_name_ar: create.company_name_ar,
        page: create.page,
        featuredImage: create.featuredImage,
        created_by: create.created_by,
      } as CreatAdvertisementDto,
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  public update(@Body() update: PatchBannerDto) {
    const updateData: PatchBannerDto = {
      id: update.id,
      company_name_en: update.company_name_en,
      company_name_ar: update.company_name_ar,
      page: update.page,
      featuredImage: update.featuredImage,
    };

    return this.service.update(updateData, this.selectOptions(), this.getRelationOptions());
  }
}
