import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { CreateGallaryDto } from "./dtos/create-gallary.dto";
import { PatchGallaryDto } from "./dtos/patch-gallary.dto";
import { Gallary } from "./gallary.entity";
import { GallaryService } from "./gallary.service";

@Controller("gallary")
export class GallaryController
  extends BaseController<Gallary, CreateGallaryDto, PatchGallaryDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: GallaryService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      content: true,
      files: true,
      orderIndex: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      createdBy: { id: true, firstName: true, lastName: true, email: true },
      tab: { id: true, content: true, slug: true, orderIndex: true },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async create(@Body() create: CreateGallaryDto, @Req() req: Request) {
    return await this.service.create(
      {
        createdBy: req["createdBy"],
        tab: req["tab"],
        content: create.content,
        files: create.files,
        orderIndex: create.orderIndex,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchGallaryDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        createdBy: req["createdBy"],
        tab: req["tab"],
        content: update.content,
        files: update.files,
        orderIndex: update.orderIndex,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
