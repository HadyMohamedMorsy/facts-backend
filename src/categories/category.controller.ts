import { Body, Controller, Delete, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { RelationOptions, SelectOptions } from "src/shared/interface/query.interface";
import { Category } from "./category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { PatchCategoryDto } from "./dto/patch-category.dto";
import { CategoryService } from "./providers/category.service";

@Controller("category")
export class CategoryController
  extends BaseController<Category, CreateCategoryDto, PatchCategoryDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: CategoryService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      name_en: true,
      name_ar: true,
      slug: true,
      magazines: true,
      created_by: true,
      created_at: true,
      updated_at: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      created_by: {
        select: ["id", "firstName", "lastName", "email"],
      },
      magazines: {
        select: ["id", "title_en", "title_ar", "description_en", "description_ar"],
      },
    };
  }

  @Post("/store")
  public async create(@Body() createDto: CreateCategoryDto) {
    return this.service.create(
      {
        name_en: createDto.name_en,
        name_ar: createDto.name_ar,
        slug: createDto.slug,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  public async update(@Body() updateDto: PatchCategoryDto) {
    return this.service.update(
      {
        id: updateDto.id,
        name_en: updateDto.name_en,
        name_ar: updateDto.name_ar,
        slug: updateDto.slug,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Delete("/delete")
  public async delete(@Body() id: number) {
    return await this.service.delete(id);
  }
}
