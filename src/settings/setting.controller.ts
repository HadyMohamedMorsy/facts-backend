import { Body, Controller, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { RelationOptions, SelectOptions } from "src/shared/interface/query.interface";
import { CreateSettingDto } from "./dtos/create-setting.dto";
import { patchSettingDto } from "./dtos/patch-setting.dto";
import { SettingsService } from "./providers/settings.service";
import { Settings } from "./setting.entity";

@Controller("setting")
export class SettingsController
  extends BaseController<Settings, CreateSettingDto, patchSettingDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: SettingsService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      section_name: true,
      title_en: true,
      title_ar: true,
      link: true,
      slug: true,
      description_en: true,
      description_ar: true,
      short_description_en: true,
      short_description_ar: true,
      icon: true,
      featuredImage: true,
      screen_shot: true,
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
  public create(@Body() create: CreateSettingDto) {
    return this.service.create(
      {
        section_name: create.section_name,
        title_en: create.title_en,
        title_ar: create.title_ar,
        link: create.link,
        slug: create.slug,
        description_en: create.description_en,
        description_ar: create.description_ar,
        short_description_en: create.short_description_en,
        short_description_ar: create.short_description_ar,
        icon: create.icon,
        featuredImage: create.featuredImage,
        screen_shot: create.screen_shot,
        created_by: create.created_by,
      } as CreateSettingDto,
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  public update(@Body() update: patchSettingDto) {
    const updateData: patchSettingDto = {
      id: update.id,
      section_name: update.section_name,
      title_en: update.title_en,
      title_ar: update.title_ar,
      link: update.link,
      slug: update.slug,
      description_en: update.description_en,
      description_ar: update.description_ar,
      short_description_en: update.short_description_en,
      short_description_ar: update.short_description_ar,
      icon: update.icon,
      featuredImage: update.featuredImage,
      screen_shot: update.screen_shot,
    };

    return this.service.update(updateData, this.selectOptions(), this.getRelationOptions());
  }
}
