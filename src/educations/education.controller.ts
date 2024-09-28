import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { BaseController } from "src/shared/common/base/base.controller";
import { HeaderToBodyInterceptor } from "src/shared/common/interceptor/transfrom-request.interceptor";
import multerOptions from "src/shared/config/multer-options";
import { CreateEducationsDto } from "./dtos/create-educations.dto";
import { PatchEducationDto } from "./dtos/patch-education.dto";
import { EducationService } from "./providers/education.service";

@Controller("education")
export class EducationController extends BaseController<CreateEducationsDto> {
  constructor(private readonly educationService: EducationService) {
    super(educationService);
  }

  @Post("/update")
  @UseInterceptors(HeaderToBodyInterceptor)
  @UseInterceptors(FileInterceptor("featuredImage", multerOptions))
  public async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() patch: PatchEducationDto,
    @Req() request: Request,
  ) {
    const { id } = patch;
    const entity = await this.educationService.findOneRel(+id);
    const updatedDto = this.transformUpdate(file, patch, request, entity);
    return this.educationService.update(+id, entity, updatedDto);
  }
}
