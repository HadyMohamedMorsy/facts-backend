import { Body, Controller, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { RelationOptions, SelectOptions } from "src/shared/interface/query.interface";
import { CreateProfiletDto } from "./dtos/create-profile";
import { PatchProfileDto } from "./dtos/patch-profile.dto";
import { Profile } from "./profile.entity";
import { ProfileService } from "./providers/profile.service";

@Controller("profile")
export class ProfileController
  extends BaseController<Profile, CreateProfiletDto, PatchProfileDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: ProfileService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      first_name: true,
      last_name: true,
      age: true,
      gender: true,
      country: true,
      phone_number: true,
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
      created_by: {
        id: true,
        firstName: true,
        lastName: true,
      },
    };
  }

  @Post("/store")
  public create(@Body() create: CreateProfiletDto) {
    return this.service.create(
      {
        first_name: create.first_name,
        last_name: create.last_name,
        age: create.age,
        created_by: create.created_by,
        country: create.country,
        phone_number: create.phone_number,
        experience: create.experience,
        skills: create.skills,
        facebook: create.facebook,
        achievements: create.achievements,
        attachment: create.attachment,
      } as CreateProfiletDto,
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  public update(@Body() update: PatchProfileDto) {
    const updateData: PatchProfileDto = {
      id: update.id,
      first_name: update.first_name,
      last_name: update.last_name,
      age: update.age,
      country: update.country,
      phone_number: update.phone_number,
      experience: update.experience,
      skills: update.skills,
      facebook: update.facebook,
      achievements: update.achievements,
      attachment: update.attachment,
    };

    return this.service.update(updateData, this.selectOptions(), this.getRelationOptions());
  }
}
