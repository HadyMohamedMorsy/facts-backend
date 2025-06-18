import { Body, Controller, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { RelationOptions, SelectOptions } from "src/shared/interface/query.interface";
import { CreateHeroSliderDto } from "./dtos/create-hero-slider.dto";
import { PatchHeroSliderDto } from "./dtos/patch-hero-slider.dto";
import { HeroSlider } from "./hero-slider.entity";
import { HeroSliderService } from "./providers/hero-slider.service";

@Controller("slider")
export class HeroSliderController
  extends BaseController<HeroSlider, CreateHeroSliderDto, PatchHeroSliderDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: HeroSliderService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      title_en: true,
      title_ar: true,
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
  public create(@Body() create: CreateHeroSliderDto) {
    return this.service.create(
      {
        title_en: create.title_en,
        title_ar: create.title_ar,
        short_description_en: create.short_description_en,
        short_description_ar: create.short_description_ar,
        featuredImage: create.featuredImage,
        created_by: create.created_by,
      } as CreateHeroSliderDto,
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  public update(@Body() update: PatchHeroSliderDto) {
    const updateData: PatchHeroSliderDto = {
      id: update.id,
      title_en: update.title_en,
      title_ar: update.title_ar,
      short_description_en: update.short_description_en,
      short_description_ar: update.short_description_ar,
      featuredImage: update.featuredImage,
    };

    return this.service.update(updateData, this.selectOptions(), this.getRelationOptions());
  }
}
