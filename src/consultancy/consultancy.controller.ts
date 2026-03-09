import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Auth } from "src/shared/decorators/auth.decorator";
import { Roles } from "src/shared/decorators/roles.decorator";
import { AuthType } from "src/shared/enum/global-enum";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { Consultancy } from "./consultancy.entity";
import { ConsultancyService } from "./consultancy.service";
import { CreateConsultancyDto } from "./dtos/create-consultancy.dto";
import { PatchConsultancyDto } from "./dtos/patch-consultancy.dto";

@Controller("consultancy")
export class ConsultancyController
  extends BaseController<Consultancy, CreateConsultancyDto, PatchConsultancyDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: ConsultancyService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      content: true,
      slug: true,
      featuredImage: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      consultancy_accordion: {
        id: true,
        content: true,
      },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async create(@Body() create: CreateConsultancyDto) {
    return await this.service.create(
      {
        content: create.content,
        slug: create.slug,
        featuredImage: create.featuredImage,
        consultancy_accordion: create.consultancy_accordion,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchConsultancyDto) {
    return await this.service.update(
      {
        id: update.id,
        content: update.content,
        slug: update.slug,
        featuredImage: update.featuredImage,
        consultancy_accordion: update.consultancy_accordion,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Get(":slug")
  @Auth(AuthType.None)
  async findBySlug(@Param("slug") slug: string) {
    return this.service.findBySlug(slug);
  }
}
