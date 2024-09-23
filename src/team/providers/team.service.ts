import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { Repository } from "typeorm";
import { CreateTeamDto } from "../dtos/create-team.dto";
import { Team } from "../team.entity";

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly repository: Repository<Team>,
    private readonly filterData: FilterDataProvider<Team>,
  ) {}

  public async create(create: CreateTeamDto) {
    const team = this.repository.create({ ...create });
    return await this.repository.save(team);
  }

  public async findAll(filter: FilterQueryDto) {
    const entity = await this.filterData
      .initRepositry("team", this.repository, filter)
      .filter()
      .provideFields()
      .sort()
      .paginate()
      .search()
      .execute();
    return entity;
  }

  public async delete(id: number) {
    await this.repository.delete(id);
    return { deleted: true, id };
  }
}
