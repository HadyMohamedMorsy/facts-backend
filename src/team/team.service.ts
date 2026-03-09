import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { Team } from "./team.entity";
import { TeamSocial } from "./team-social.entity";
import { CreateTeamDto } from "./dtos/create-team.dto";
import { PatchTeamDto } from "./dtos/patch-team.dto";

@Injectable()
export class TeamService
  extends BaseService<Team, CreateTeamDto, PatchTeamDto>
  implements ICrudService<Team, CreateTeamDto, PatchTeamDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Team)
    repository: Repository<Team>,
    @InjectRepository(TeamSocial)
    private readonly teamSocialRepository: Repository<TeamSocial>,
  ) {
    super(repository, apiFeaturesService);
  }

  override async create(
    createDto: CreateTeamDto & { createdBy?: any },
    selectOptions?: Record<string, boolean>,
    relations?: Record<string, any>,
  ): Promise<Team> {
    const { socialLinks, ...teamData } = createDto;
    const team = await super.create(teamData as any, selectOptions, relations);
    const teamId = (team as any).id;
    if (socialLinks && socialLinks.length > 0) {
      const socialEntities = socialLinks.map(({ icon, link }) =>
        this.teamSocialRepository.create({ icon, link, team: { id: teamId } as Team }),
      );
      await this.teamSocialRepository.save(socialEntities);
    }
    return this.findOne(teamId, selectOptions, relations);
  }

  override async update(
    updateDto: PatchTeamDto & { id: number; createdBy?: any },
    selectOptions?: Record<string, boolean>,
    relations?: Record<string, any>,
  ): Promise<Team> {
    const { socialLinks, ...teamData } = updateDto;
    const teamId = updateDto.id;
    if (socialLinks !== undefined) {
      await this.teamSocialRepository
        .createQueryBuilder()
        .delete()
        .where("teamId = :teamId", { teamId })
        .execute();
      if (socialLinks.length > 0) {
        const socialEntities = socialLinks.map(({ icon, link }) =>
          this.teamSocialRepository.create({ icon, link, team: { id: teamId } as Team }),
        );
        await this.teamSocialRepository.save(socialEntities);
      }
    }
    return super.update(teamData as any, selectOptions, relations);
  }
}
