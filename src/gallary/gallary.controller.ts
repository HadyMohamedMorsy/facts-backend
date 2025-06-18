import { Body, Controller, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { RelationOptions, SelectOptions } from "src/shared/interface/query.interface";
import { CreateGallarysDto } from "./dtos/create-gallary.dto";
import { PatchGallaryDto } from "./dtos/patch-gallary.dto";
import { Gallary } from "./gallary.entity";
import { GallaryService } from "./providers/gallary.service";

@Controller("gallary")
export class GallaryController
  extends BaseController<Gallary, CreateGallarysDto, PatchGallaryDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: GallaryService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      accordion_title_en: true,
      accordion_title_ar: true,
      files: true,
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
  public create(@Body() create: CreateGallarysDto) {
    return this.service.create(
      {
        accordion_title_en: create.accordion_title_en,
        accordion_title_ar: create.accordion_title_ar,
        files: create.files,
        created_by: create.created_by,
      } as CreateGallarysDto,
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  public update(@Body() update: PatchGallaryDto) {
    const updateData: PatchGallaryDto = {
      id: update.id,
      accordion_title_en: update.accordion_title_en,
      accordion_title_ar: update.accordion_title_ar,
      files: update.files,
    };

    return this.service.update(updateData, this.selectOptions(), this.getRelationOptions());
  }
}
