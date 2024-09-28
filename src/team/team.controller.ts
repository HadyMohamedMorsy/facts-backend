import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { BaseController } from "src/shared/common/base/base.controller";
import { HeaderToBodyInterceptor } from "src/shared/common/interceptor/transfrom-request.interceptor";
import multerOptions from "src/shared/config/multer-options";
import { CreateTeamDto } from "./dtos/create-team.dto";
import { PatchTeamDto } from "./dtos/patch-team.dto";
import { TeamService } from "./providers/team.service";

@Controller("team")
export class TeamController extends BaseController<CreateTeamDto> {
  constructor(private readonly teamService: TeamService) {
    super(teamService);
  }

  @Post("/update")
  @UseInterceptors(HeaderToBodyInterceptor)
  @UseInterceptors(FileInterceptor("featuredImage", multerOptions))
  public async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() patch: PatchTeamDto,
    @Req() request: Request,
  ) {
    const { id } = patch;
    const entity = await this.teamService.findOneRel(+id);
    const updatedDto = this.transformUpdate(file, patch, request, entity);
    return this.teamService.update(+id, entity, updatedDto);
  }
}
