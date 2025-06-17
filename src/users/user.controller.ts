import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { Request } from "express";
import { BaseController } from "src/shared/base/base.controller";
import { RelationOptions, SelectOptions } from "src/shared/interface/query.interface";
import { CreateUserDto } from "./dtos/create-user.dto";
import { PatchUserDto } from "./dtos/patch-user.dto";
import { UserService } from "./providers/user.service";
import { User } from "./user.entity";

@Controller("user")
export class UserController
  extends BaseController<User, CreateUserDto, PatchUserDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: UserService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      username: true,
      gender: true,
      phone_number: true,
      country: true,
      address: true,
      is_active: true,
      created_at: true,
      updated_at: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      role: {
        id: true,
        name: true,
      },
      createdBy: {
        id: true,
        firstName: true,
        lastName: true,
      },
    };
  }

  @Post("/store")
  public create(@Body() create: CreateUserDto, @Req() req: Request) {
    return this.service.create(
      {
        firstName: create.firstName,
        lastName: create.lastName,
        email: create.email,
        username: create.username,
        gender: create.gender,
        phone_number: create.phone_number,
        country: create.country,
        address: create.address,
        password: req["password"],
        role: create.role,
        is_active: create.is_active,
      } as CreateUserDto,
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  public async update(@Body() update: PatchUserDto, @Req() req: Request) {
    const updateData: PatchUserDto = {
      id: update.id,
      firstName: update.firstName,
      lastName: update.lastName,
      email: update.email,
      username: update.username,
      gender: update.gender,
      phone_number: update.phone_number,
      country: update.country,
      address: update.address,
      role: update.role,
      is_active: update.is_active,
    };
    if (req["password"]) updateData.password = req["password"];

    return await this.service.update(updateData, this.selectOptions(), this.getRelationOptions());
  }

  @Put("/change-status")
  public changeStatus(@Body() update: { id: number; isActive: boolean }) {
    return this.service.changeStatus(update.id, update.isActive, "is_active", {
      id: true,
      is_active: true,
    });
  }
}
