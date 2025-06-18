import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Auth } from "src/shared/decorators/auth.decorator";
import { AuthType } from "src/shared/enum/global-enum";
import { RelationOptions, SelectOptions } from "src/shared/interface/query.interface";
import { Blog } from "./blog.entity";
import { CreateBlogsDto } from "./dto/create-blogs-blogs.dto";
import { PatchBlogDto } from "./dto/patch-blog.dto";
import { BlogService } from "./providers/blog.service";

@Controller("blog")
export class BlogController
  extends BaseController<Blog, CreateBlogsDto, PatchBlogDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: BlogService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      title_en: true,
      title_ar: true,
      slug: true,
      meta_title_en: true,
      meta_title_ar: true,
      meta_description_en: true,
      meta_description_ar: true,
      short_description_en: true,
      short_description_ar: true,
      description_en: true,
      description_ar: true,
      featuredImage: true,
      thumbnail: true,
      magazine: true,
      selectMagazine: true,
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
      magazine: {
        select: ["id", "title_en", "title_ar", "description_en", "description_ar"],
      },
    };
  }

  @Post("/store")
  public async create(@Body() createDto: CreateBlogsDto) {
    return this.service.create(
      {
        title_en: createDto.title_en,
        title_ar: createDto.title_ar,
        slug: createDto.slug,
        meta_title_en: createDto.meta_title_en,
        meta_title_ar: createDto.meta_title_ar,
        meta_description_en: createDto.meta_description_en,
        meta_description_ar: createDto.meta_description_ar,
        short_description_en: createDto.short_description_en,
        short_description_ar: createDto.short_description_ar,
        description_en: createDto.description_en,
        description_ar: createDto.description_ar,
        featuredImage: createDto.featuredImage,
        thumbnail: createDto.thumbnail,
        magazine: createDto.magazine,
        selectMagazine: createDto.selectMagazine,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  public async update(@Body() updateDto: PatchBlogDto) {
    return this.service.update(
      {
        id: updateDto.id,
        title_en: updateDto.title_en,
        title_ar: updateDto.title_ar,
        slug: updateDto.slug,
        meta_title_en: updateDto.meta_title_en,
        meta_title_ar: updateDto.meta_title_ar,
        meta_description_en: updateDto.meta_description_en,
        meta_description_ar: updateDto.meta_description_ar,
        short_description_en: updateDto.short_description_en,
        short_description_ar: updateDto.short_description_ar,
        description_en: updateDto.description_en,
        description_ar: updateDto.description_ar,
        featuredImage: updateDto.featuredImage,
        thumbnail: updateDto.thumbnail,
        magazine: updateDto.magazine,
        selectMagazine: updateDto.selectMagazine,
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
