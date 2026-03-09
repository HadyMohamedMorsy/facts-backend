import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { Profile } from "./profile.entity";
import { ProfileService } from "./profile.service";
import { CreateProfileDto } from "./dtos/create-profile.dto";
import { PatchProfileDto } from "./dtos/patch-profile.dto";

@Controller("profile")
export class ProfileController
  extends BaseController<Profile, CreateProfileDto, PatchProfileDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: ProfileService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      firstName: true,
      lastName: true,
      age: true,
      gender: true,
      country: true,
      phoneNumber: true,
      experience: true,
      skills: true,
      facebook: true,
      achievements: true,
      attachment: true,
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
  public async create(@Body() create: CreateProfileDto, @Req() req: Request) {
    return await this.service.create(
      {
        createdBy: req["createdBy"],
        firstName: create.firstName,
        lastName: create.lastName,
        age: create.age,
        gender: create.gender,
        country: create.country,
        phoneNumber: create.phoneNumber,
        experience: create.experience,
        skills: create.skills,
        facebook: create.facebook,
        achievements: create.achievements,
        attachment: create.attachment,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchProfileDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        createdBy: req["createdBy"],
        firstName: update.firstName,
        lastName: update.lastName,
        age: update.age,
        gender: update.gender,
        country: update.country,
        phoneNumber: update.phoneNumber,
        experience: update.experience,
        skills: update.skills,
        facebook: update.facebook,
        achievements: update.achievements,
        attachment: update.attachment,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
