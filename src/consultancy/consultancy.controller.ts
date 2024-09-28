import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { BaseController } from "src/shared/common/base/base.controller";
import { HeaderToBodyInterceptor } from "src/shared/common/interceptor/transfrom-request.interceptor";
import multerOptions from "src/shared/config/multer-options";
import { CreateConsultancyDto } from "./dtos/create-consultancy.dto";
import { PatchConsultancyDto } from "./dtos/patch-consultancy.dto";
import { ConsultancyService } from "./providers/consultancy.service";

@Controller("consultancy")
export class ConsultancyController extends BaseController<CreateConsultancyDto> {
  constructor(private readonly consultancyService: ConsultancyService) {
    super(consultancyService);
  }

  @Post("/update")
  @UseInterceptors(HeaderToBodyInterceptor)
  @UseInterceptors(FileInterceptor("featuredImage", multerOptions))
  public async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() patch: PatchConsultancyDto,
    @Req() request: Request,
  ) {
    const { id } = patch;
    const entity = await this.consultancyService.findOneRel(+id);
    const updatedDto = this.transformUpdate(file, patch, request, entity);
    return this.consultancyService.update(+id, entity, updatedDto);
  }
}
