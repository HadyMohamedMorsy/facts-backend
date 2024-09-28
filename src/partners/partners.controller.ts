import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { BaseController } from "src/shared/common/base/base.controller";
import { HeaderToBodyInterceptor } from "src/shared/common/interceptor/transfrom-request.interceptor";
import multerOptions from "src/shared/config/multer-options";
import { CreatePartnersDto } from "./dtos/create-partners.dto";
import { PatchPartnerDto } from "./dtos/patch-partners.dto";
import { PartnersService } from "./providers/partners.service";

@Controller("partner")
export class PartnersController extends BaseController<CreatePartnersDto> {
  constructor(private readonly partnerService: PartnersService) {
    super(partnerService);
  }

  @Post("/update")
  @UseInterceptors(HeaderToBodyInterceptor)
  @UseInterceptors(FileInterceptor("featuredImage", multerOptions))
  public async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() patch: PatchPartnerDto,
    @Req() request: Request,
  ) {
    const { id } = patch;
    const entity = await this.partnerService.findOneRel(+id);
    const updatedDto = this.transformUpdate(file, patch, request, entity);
    return this.partnerService.update(+id, entity, updatedDto);
  }
}
