import { Body, Controller, Get, HttpCode, Param, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Auth } from "src/shared/decorators/auth.decorator";
import { Roles } from "src/shared/decorators/roles.decorator";
import { AuthType } from "src/shared/enum/global-enum";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { Graduates } from "./graduates.entity";
import { GraduatesService } from "./graduates.service";
import { CreateGraduateDto } from "./dtos/create-graduate.dto";
import { PatchGraduateDto } from "./dtos/patch-graduate.dto";

@Controller("graduates")
export class GraduatesController
  extends BaseController<Graduates, CreateGraduateDto, PatchGraduateDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: GraduatesService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      content: true,
      type: true,
      slug: true,
      courses: true,
      courseName: true,
      codeCertification: true,
      dateCourse: true,
      featuredImage: true,
      attachment: true,
      imageCertification: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      createdBy: { id: true, firstName: true, lastName: true, email: true },
      user: { id: true, username: true, firstName: true, lastName: true, email: true },
      tab: { id: true, content: true, slug: true, orderIndex: true },
    };
  }

  @Post("/store")
  @Auth(AuthType.None)
  public async create(@Body() create: CreateGraduateDto, @Req() req: Request) {
    return await this.service.create(
      {
        createdBy: req["createdBy"],
        user: req["user"],
        tab: req["tab"],
        content: create.content,
        slug: create.slug,
        type: create.type,
        courses: create.courses,
        courseName: create.courseName,
        codeCertification: create.codeCertification,
        dateCourse: create.dateCourse,
        featuredImage: create.featuredImage,
        attachment: create.attachment,
        imageCertification: create.imageCertification,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchGraduateDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        createdBy: req["createdBy"],
        user: req["user"],
        tab: req["tab"] ?? null,
        content: update.content,
        slug: update.slug,
        type: update.type,
        courses: update.courses,
        courseName: update.courseName,
        codeCertification: update.codeCertification,
        dateCourse: update.dateCourse,
        featuredImage: update.featuredImage,
        attachment: update.attachment,
        imageCertification: update.imageCertification,
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
  @HttpCode(200)
  @Auth(AuthType.None)
  async frontIndex(
    @Body()
    body: { query?: any } | { start?: number; length?: number; [k: string]: any },
  ) {
    if (body && typeof body === "object" && "query" in body) {
      const q = (body as any).query ?? {};
      return this.service.findFront({ query: { ...q, isPagination: "true" } });
    }

    const start = Number((body as any).start ?? 0);
    const length = Number((body as any).length ?? 10);
    const page = Number.isFinite(length) && length > 0 ? Math.floor(start / length) + 1 : 1;

    return this.service.findFront({
      query: {
        search: (body as any).search,
        filters: (body as any).filters,
        select: (body as any).select,
        relations: {
          ...(body as any).relations,
          user: {
            select: ["id", "username", "firstName", "lastName", "email"],
          },
        },
        sort: (body as any).sort?.field
          ? { field: (body as any).sort.field, order: (body as any).sort.order ?? "ASC" }
          : undefined,
        page,
        limit: Number.isFinite(length) ? length : 10,
        isPagination: "true",
      },
    });
  }
}
