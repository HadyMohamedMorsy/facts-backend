import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interface/crud-service.interface";
import { Repository } from "typeorm";
import { CreateTeamDto } from "../dtos/create-team.dto";
import { PatchTeamDto } from "../dtos/patch-team.dto";
import { Team } from "../team.entity";

@Injectable()
export class TeamService
  extends BaseService<Team, CreateTeamDto, PatchTeamDto>
  implements ICrudService<Team, CreateTeamDto, PatchTeamDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Team)
    repository: Repository<Team>,
  ) {
    super(repository, apiFeaturesService);
  }
}
