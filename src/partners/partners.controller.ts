import { Body, Controller, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { RelationOptions, SelectOptions } from "src/shared/interface/query.interface";
import { CreatePartnersDto } from "./dtos/create-partners.dto";
import { PatchPartnerDto } from "./dtos/patch-partners.dto";
import { Partner } from "./partner.entity";
import { PartnersService } from "./providers/partners.service";

@Controller("partner")
export class PartnersController
  extends BaseController<Partner, CreatePartnersDto, PatchPartnerDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: PartnersService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      title_en: true,
      title_ar: true,
      link: true,
      description_en: true,
      description_ar: true,
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
  public create(@Body() create: CreatePartnersDto) {
    return this.service.create(
      {
        title_en: create.title_en,
        title_ar: create.title_ar,
        link: create.link,
        description_en: create.description_en,
        description_ar: create.description_ar,
        featuredImage: create.featuredImage,
        created_by: create.created_by,
      } as CreatePartnersDto,
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  public update(@Body() update: PatchPartnerDto) {
    const updateData: PatchPartnerDto = {
      id: update.id,
      title_en: update.title_en,
      title_ar: update.title_ar,
      link: update.link,
      description_en: update.description_en,
      description_ar: update.description_ar,
      featuredImage: update.featuredImage,
    };

    return this.service.update(updateData, this.selectOptions(), this.getRelationOptions());
  }
}
