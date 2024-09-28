import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { BaseController } from "src/shared/common/base/base.controller";
import { HeaderToBodyInterceptor } from "src/shared/common/interceptor/transfrom-request.interceptor";
import multerOptions from "src/shared/config/multer-options";
import { CreateStatisticsDto } from "./dtos/create-statistics.dto";
import { PatchStatisticsDto } from "./dtos/patch-partners.dto";
import { StatisticsService } from "./providers/statistics.service";

@Controller("statistics")
export class StatisticsController extends BaseController<CreateStatisticsDto> {
  constructor(private readonly statisticsService: StatisticsService) {
    super(statisticsService);
  }

  @Post("/update")
  @UseInterceptors(HeaderToBodyInterceptor)
  @UseInterceptors(FileInterceptor("featuredImage", multerOptions))
  public async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() patch: PatchStatisticsDto,
    @Req() request: Request,
  ) {
    const { id } = patch;
    const entity = await this.statisticsService.findOne(+id);
    const updatedDto = this.transformUpdate(file, patch, request, entity);
    return this.statisticsService.update(+id, entity, updatedDto);
  }
}
