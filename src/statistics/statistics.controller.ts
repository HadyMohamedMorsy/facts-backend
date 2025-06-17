import { Body, Controller, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { RelationOptions, SelectOptions } from "src/shared/interface/query.interface";
import { CreateStatisticsDto } from "./dtos/create-statistics.dto";
import { PatchStatisticsDto } from "./dtos/patch-statistics.dto";
import { StatisticsService } from "./providers/statistics.service";
import { Statistics } from "./statistics.entity";

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
      title_en: true,
      title_ar: true,
      value: true,
      icon: true,
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
  public create(@Body() create: CreateStatisticsDto) {
    return this.service.create(
      {
        title_en: create.title_en,
        title_ar: create.title_ar,
        value: create.value,
        icon: create.icon,
        order: create.order,
      } as CreateStatisticsDto,
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  public update(@Body() update: PatchStatisticsDto) {
    const updateData: PatchStatisticsDto = {
      id: update.id,
      title_en: update.title_en,
      title_ar: update.title_ar,
      value: update.value,
      icon: update.icon,
      order: update.order,
    };

    return this.service.update(updateData, this.selectOptions(), this.getRelationOptions());
  }
}
