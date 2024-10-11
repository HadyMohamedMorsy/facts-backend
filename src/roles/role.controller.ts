import { Controller, Post } from "@nestjs/common";
import { RoleService } from "./providers/role.service";

@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post("/role-list")
  public index() {
    return this.roleService.findAll();
  }
}
