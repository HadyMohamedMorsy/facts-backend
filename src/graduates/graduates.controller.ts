import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { Auth } from "src/auth/decorators/auth.decorator";
import { AuthType } from "src/auth/enums/auth-type.enum";
import { BaseController } from "src/shared/common/base/base.controller";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { HeaderToBodyInterceptor } from "src/shared/common/interceptor/transfrom-request.interceptor";
import multerOptions from "src/shared/config/multer-options";
import { CreateGraduatestDto } from "./dtos/create-graduates";
import { GraduatesService } from "./providers/graduates.service";

@Controller("graduates")
export class GraduatesController extends BaseController<CreateGraduatestDto> {
  constructor(
    private readonly graduatesService: GraduatesService,
    private readonly transformRequest: TransformRequest,
  ) {
    super(graduatesService, transformRequest);
    this.propertiesRel = ["created_by", "user"];
  }

  @Post("/store/front")
  @Auth(AuthType.None)
  @UseInterceptors(HeaderToBodyInterceptor)
  @UseInterceptors(AnyFilesInterceptor(multerOptions))
  public async createGraduate(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createDto: any,
    @Req() request: Request,
  ) {
    super.create(files, createDto, request);
  }

  @Get(":slug")
  @Auth(AuthType.None)
  async findBySlug(@Param("slug") slug: string) {
    return this.graduatesService.findBySlug(slug);
  }
}
