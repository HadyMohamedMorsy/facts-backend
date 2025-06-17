import { Body, Controller, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { RelationOptions, SelectOptions } from "src/shared/interface/query.interface";
import { PatchRoleDto, RoleDto } from "./dto/role.dto";
import { RoleService } from "./providers/role.service";
import { Role } from "./role.entity";

@Controller("role")
export class RoleController
  extends BaseController<Role, RoleDto, PatchRoleDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: RoleService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      name: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {};
  }

  @Post("/store")
  public create(@Body() create: RoleDto) {
    return this.service.create(
      {
        name: create.name,
      } as RoleDto,
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  public update(@Body() update: PatchRoleDto) {
    const updateData: PatchRoleDto = {
      id: update.id,
      name: update.name,
    };

    return this.service.update(updateData, this.selectOptions(), this.getRelationOptions());
  }
}
