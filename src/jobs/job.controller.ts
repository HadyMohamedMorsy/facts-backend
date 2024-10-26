import { Body, Controller, Post, Req, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { Auth } from "src/auth/decorators/auth.decorator";
import { AuthType } from "src/auth/enums/auth-type.enum";
import { BaseController } from "src/shared/common/base/base.controller";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { HeaderToBodyInterceptor } from "src/shared/common/interceptor/transfrom-request.interceptor";
import multerOptions from "src/shared/config/multer-options";
import { CreateJobDto } from "./dtos/create-job.dto";
import { JobService } from "./providers/job.service";

@Controller("job")
export class JobController extends BaseController<CreateJobDto> {
  constructor(
    private readonly jobService: JobService,
    private readonly TransformRequest: TransformRequest,
  ) {
    super(jobService, TransformRequest);
  }

  @Post("/store/front")
  @Auth(AuthType.None)
  @UseInterceptors(HeaderToBodyInterceptor)
  @UseInterceptors(AnyFilesInterceptor(multerOptions))
  public async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createDto: any,
    @Req() request: Request,
  ) {
    super.create(files, createDto, request);
  }
}
