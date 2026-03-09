import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Auth } from "src/shared/decorators/auth.decorator";
import { Roles } from "src/shared/decorators/roles.decorator";
import { AuthType } from "src/shared/enum/global-enum";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { Education } from "./education.entity";
import { EducationService } from "./education.service";
import { CreateEducationDto } from "./dtos/create-education.dto";
import { PatchEducationDto } from "./dtos/patch-education.dto";

@Controller("education")
export class EducationController
  extends BaseController<Education, CreateEducationDto, PatchEducationDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: EducationService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      content: true,
      slug: true,
      featuredImage: true,
      thumbnail: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      education_accordion: { id: true, content: true },
      education_details: { id: true, content: true },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async create(@Body() create: CreateEducationDto) {
    return await this.service.create(
      {
        content: create.content,
        slug: create.slug,
        featuredImage: create.featuredImage,
        thumbnail: create.thumbnail,
        education_accordion: create.education_accordion,
        education_details: create.education_details,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchEducationDto) {
    return await this.service.update(
      {
        id: update.id,
        content: update.content,
        slug: update.slug,
        featuredImage: update.featuredImage,
        thumbnail: update.thumbnail,
        education_accordion: update.education_accordion,
        education_details: update.education_details,
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
