import { Body, Controller, Get, Param, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Auth } from "src/shared/decorators/auth.decorator";
import { Roles } from "src/shared/decorators/roles.decorator";
import { AuthType } from "src/shared/enum/global-enum";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { Magazine } from "./magazine.entity";
import { MagazineService } from "./magazine.service";
import { CreateMagazineDto } from "./dto/create-magazine.dto";
import { PatchMagazineDto } from "./dto/patch-magazine.dto";

@Controller("magazine")
export class MagazineController
  extends BaseController<Magazine, CreateMagazineDto, PatchMagazineDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: MagazineService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      content: true,
      slug: true,
      featuredImage: true,
      publicationDate: true,
      orderIndex: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      createdBy: { id: true, firstName: true, lastName: true, email: true },
      categories: { id: true, content: true, slug: true },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async create(@Body() create: CreateMagazineDto, @Req() req: Request) {
    return await this.service.create(
      {
        createdBy: req["createdBy"],
        categories: req["categories"],
        content: create.content,
        slug: create.slug,
        featuredImage: create.featuredImage,
        publicationDate: create.publicationDate,
        orderIndex: create.orderIndex,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchMagazineDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        createdBy: req["createdBy"],
        categories: req["categories"],
        content: update.content,
        slug: update.slug,
        featuredImage: update.featuredImage,
        publicationDate: update.publicationDate,
        orderIndex: update.orderIndex,
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

  @Post("front/index")
  @Auth(AuthType.None)
  async frontIndex(@Body() query: { query?: any }) {
    return this.service.findFront(query);
  }

  @Post("magazines/blogs")
  @Auth(AuthType.None)
  async slugWithBlogs(
    @Body() filter: { filters?: { slug?: string }; length?: number; start?: number },
  ) {
    return this.service.findBySlugWithPaginatedBlogs(filter);
  }
}
