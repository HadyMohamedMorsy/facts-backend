import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { Team } from "./team.entity";
import { TeamService } from "./team.service";
import { CreateTeamDto } from "./dtos/create-team.dto";
import { PatchTeamDto } from "./dtos/patch-team.dto";

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
      content: true,
      phoneNumber: true,
      featuredImage: true,
      orderIndex: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      createdBy: { id: true, firstName: true, lastName: true, email: true },
      socialLinks: { id: true, icon: true, link: true },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async create(@Body() create: CreateTeamDto, @Req() req: Request) {
    return await this.service.create(
      {
        createdBy: req["createdBy"],
        content: create.content,
        phoneNumber: create.phoneNumber,
        featuredImage: create.featuredImage,
        socialLinks: create.socialLinks,
        orderIndex: create.orderIndex,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchTeamDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        createdBy: req["createdBy"],
        content: update.content,
        phoneNumber: update.phoneNumber,
        featuredImage: update.featuredImage,
        socialLinks: update.socialLinks,
        orderIndex: update.orderIndex,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
