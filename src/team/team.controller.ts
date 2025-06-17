import { Body, Controller, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { RelationOptions, SelectOptions } from "src/shared/interface/query.interface";
import { CreateTeamDto } from "./dtos/create-team.dto";
import { PatchTeamDto } from "./dtos/patch-team.dto";
import { TeamService } from "./providers/team.service";
import { Team } from "./team.entity";

@Controller("team")
export class TeamController
  extends BaseController<Team, CreateTeamDto, PatchTeamDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: TeamService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      name_en: true,
      name_ar: true,
      phone_number: true,
      description_en: true,
      description_ar: true,
      position_en: true,
      position_ar: true,
      featuredImage: true,
      is_active: true,
      order: true,
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
  public create(@Body() create: CreateTeamDto) {
    return this.service.create(
      {
        name_en: create.name_en,
        name_ar: create.name_ar,
        phone_number: create.phone_number,
        description_en: create.description_en,
        description_ar: create.description_ar,
        position_en: create.position_en,
        position_ar: create.position_ar,
        featuredImage: create.featuredImage,
        social_links: create.social_links,
      } as CreateTeamDto,
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  public update(@Body() update: PatchTeamDto) {
    const updateData: PatchTeamDto = {
      id: update.id,
      name_en: update.name_en,
      name_ar: update.name_ar,
      phone_number: update.phone_number,
      description_en: update.description_en,
      description_ar: update.description_ar,
      position_en: update.position_en,
      position_ar: update.position_ar,
      featuredImage: update.featuredImage,
      social_links: update.social_links,
    };

    return this.service.update(updateData, this.selectOptions(), this.getRelationOptions());
  }
}
