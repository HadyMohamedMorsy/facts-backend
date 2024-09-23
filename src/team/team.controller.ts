import { Body, Controller, Post } from "@nestjs/common";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { CreateTeamDto } from "./dtos/create-team.dto";
import { TeamService } from "./providers/team.service";

@Controller("team")
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post("/index")
  public index(@Body() filterQueryDto: FilterQueryDto) {
    return this.teamService.findAll(filterQueryDto);
  }

  @Post("/store")
  public create(@Body() create: CreateTeamDto) {
    return this.teamService.create(create);
  }

  @Post("/delete")
  public delete(@Body() id: number) {
    return this.teamService.delete(id);
  }
}
