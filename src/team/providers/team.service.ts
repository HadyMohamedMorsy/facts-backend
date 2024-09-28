import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LanguageService } from "src/languages/providers/language.service";
import { BaseService } from "src/shared/common/base/base.service";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { UserService } from "src/users/providers/user.service";
import { Repository } from "typeorm";
import { CreateTeamDto } from "../dtos/create-team.dto";
import { Team } from "../team.entity";

@Injectable()
export class TeamService extends BaseService<Team, CreateTeamDto> {
  constructor(
    @InjectRepository(Team)
    repository: Repository<Team>,
    filterData: FilterDataProvider<Team>,
    usersService: UserService,
    languageService: LanguageService,
  ) {
    super(repository, filterData, usersService, languageService);
  }

  async findAll(filter: FilterQueryDto) {
    const entity = await this.filters(filter, "team").execute();
    const result = await this.filters(filter, "team").count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }
}
