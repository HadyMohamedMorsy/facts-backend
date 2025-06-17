import { Body, Controller, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { RelationOptions, SelectOptions } from "src/shared/interface/query.interface";
import { CreateSubscribeDto } from "./dtos/create-subscribe";
import { PatchSubscribeDto } from "./dtos/patch-subscribe.dto";
import { SubscribtionService } from "./providers/subscribtion.service";
import { Subscribe } from "./subscribtion.entity";

@Controller("subscription")
export class SubscribtionController
  extends BaseController<Subscribe, CreateSubscribeDto, PatchSubscribeDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: SubscribtionService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      email_subscribe: true,
      type: true,
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
  public create(@Body() create: CreateSubscribeDto) {
    return this.service.create(
      {
        email_subscribe: create.email_subscribe,
        type: create.type,
        created_by: create.created_by,
      } as CreateSubscribeDto,
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Post("/delete")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }

  @Put("/update")
  public update(@Body() update: PatchSubscribeDto) {
    const updateData: PatchSubscribeDto = {
      id: update.id,
      email_subscribe: update.email_subscribe,
      type: update.type,
    };

    return this.service.update(updateData, this.selectOptions(), this.getRelationOptions());
  }
}
