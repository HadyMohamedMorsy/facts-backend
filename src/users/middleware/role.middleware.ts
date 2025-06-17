import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { RoleService } from "./../../roles/providers/role.service";

@Injectable()
export class UserRoleMiddleware implements NestMiddleware {
  constructor(private readonly roleService: RoleService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const role = req.body.role;
    const role = await this.roleService.findOneById(role);

    next();
  }
}
