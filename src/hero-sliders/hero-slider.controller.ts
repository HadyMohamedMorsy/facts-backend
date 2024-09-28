import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { BaseController } from "src/shared/common/base/base.controller";
import { HeaderToBodyInterceptor } from "src/shared/common/interceptor/transfrom-request.interceptor";
import multerOptions from "src/shared/config/multer-options";
import { CreateHeroSliderDto } from "./dtos/create-hero-slider.dto";
import { PatchPostDto } from "./dtos/patch-consultancy.dto";
import { HeroSliderService } from "./providers/hero-slider.service";

@Controller("slider")
export class HeroSliderController extends BaseController<CreateHeroSliderDto> {
  constructor(private readonly heroSliderService: HeroSliderService) {
    super(heroSliderService);
  }

  @Post("/update")
  @UseInterceptors(HeaderToBodyInterceptor)
  @UseInterceptors(FileInterceptor("featuredImage", multerOptions))
  public async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() patch: PatchPostDto,
    @Req() request: Request,
  ) {
    const { id } = patch;
    const entity = await this.heroSliderService.findOne(+id);
    const updatedDto = this.transformUpdate(file, patch, request, entity);
    return this.heroSliderService.update(+id, entity, updatedDto);
  }
}
