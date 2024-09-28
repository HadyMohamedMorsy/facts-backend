import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { BaseController } from "src/shared/common/base/base.controller";
import { HeaderToBodyInterceptor } from "src/shared/common/interceptor/transfrom-request.interceptor";
import multerOptions from "src/shared/config/multer-options";
import { CreateBannerDto } from "./dtos/create-banner.dto";
import { PatchBannerDto } from "./dtos/patch-banner.dto";
import { BannerService } from "./providers/banner.service";

@Controller("banner")
export class BannerController extends BaseController<CreateBannerDto> {
  constructor(private readonly bannerService: BannerService) {
    super(bannerService);
  }

  @Post("/update")
  @UseInterceptors(HeaderToBodyInterceptor)
  @UseInterceptors(FileInterceptor("featuredImage", multerOptions))
  public async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() patch: PatchBannerDto,
    @Req() request: Request,
  ) {
    const { id } = patch;
    const entity = await this.bannerService.findOneRel(+id);
    const updatedDto = this.transformUpdate(file, patch, request, entity);
    return this.bannerService.update(+id, entity, updatedDto);
  }
}
