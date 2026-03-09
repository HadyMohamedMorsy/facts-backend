import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Auth } from "src/shared/decorators/auth.decorator";
import { Roles } from "src/shared/decorators/roles.decorator";
import { AuthType } from "src/shared/enum/global-enum";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { Subscribe } from "./subscribtion.entity";
import { SubscribtionService } from "./subscribtion.service";
import { CreateSubscribeDto } from "./dtos/create-subscribe.dto";
import { PatchSubscribeDto } from "./dtos/patch-subscribe.dto";

@Controller("subscribtion")
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
      emailSubscribe: true,
      type: true,
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
  @Auth(AuthType.None)
  public async create(@Body() create: CreateSubscribeDto, @Req() req: Request) {
    return await this.service.create(
      {
        createdBy: req["createdBy"],
        emailSubscribe: create.emailSubscribe,
        type: create.type,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchSubscribeDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        createdBy: req["createdBy"],
        emailSubscribe: update.emailSubscribe,
        type: update.type,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
