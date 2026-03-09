import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { Statistics } from "./statistics.entity";
import { StatisticsService } from "./statistics.service";
import { CreateStatisticsDto } from "./dtos/create-statistics.dto";
import { PatchStatisticsDto } from "./dtos/patch-statistics.dto";

@Controller("statistics")
export class StatisticsController
  extends BaseController<Statistics, CreateStatisticsDto, PatchStatisticsDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: StatisticsService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      content: true,
      value: true,
      icon: true,
      orderIndex: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      createdBy: { id: true, firstName: true, lastName: true, email: true },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async create(@Body() create: CreateStatisticsDto, @Req() req: Request) {
    return await this.service.create(
      {
        createdBy: req["createdBy"],
        content: create.content,
        value: create.value,
        icon: create.icon,
        orderIndex: create.orderIndex,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchStatisticsDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        createdBy: req["createdBy"],
        content: update.content,
        value: update.value,
        icon: update.icon,
        orderIndex: update.orderIndex,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
