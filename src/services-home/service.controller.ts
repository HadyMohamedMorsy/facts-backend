import { Body, Controller, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { RelationOptions, SelectOptions } from "src/shared/interface/query.interface";
import { PatchServiceDto } from "./dto/patch-service.dto";
import { CreateServiceDto } from "./dto/service.dto";
import { ServiceService } from "./providers/service.service";
import { Service } from "./service.entity";

@Controller("service-home")
export class ServiceController
  extends BaseController<Service, CreateServiceDto, PatchServiceDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: ServiceService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      name_en: true,
      name_ar: true,
      link: true,
      featuredImage: true,
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
  public create(@Body() create: CreateServiceDto) {
    return this.service.create(
      {
        name_en: create.name_en,
        name_ar: create.name_ar,
        link: create.link,
        featuredImage: create.featuredImage,
      } as CreateServiceDto,
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  public update(@Body() update: PatchServiceDto) {
    const updateData: PatchServiceDto = {
      id: update.id,
      name_en: update.name_en,
      name_ar: update.name_ar,
      link: update.link,
      featuredImage: update.featuredImage,
    };

    return this.service.update(updateData, this.selectOptions(), this.getRelationOptions());
  }
}
