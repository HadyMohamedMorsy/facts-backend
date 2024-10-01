import { Controller } from "@nestjs/common";
import { BaseController } from "src/shared/common/base/base.controller";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { CreateTeamDto } from "./dtos/create-team.dto";
import { TeamService } from "./providers/team.service";

@Controller("team")
export class TeamController extends BaseController<CreateTeamDto> {
  constructor(
    private readonly teamService: TeamService,
    private readonly TransformRequest: TransformRequest,
  ) {
    super(teamService, TransformRequest);
    this.duplicatedPropertirs = ["order"];
  }
}
