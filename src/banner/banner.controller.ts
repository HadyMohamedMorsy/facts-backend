import { Controller } from "@nestjs/common";
import { BaseController } from "src/shared/common/base/base.controller";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { CreateBannerDto } from "./dtos/create-banner.dto";
import { BannerService } from "./providers/banner.service";

@Controller("banner")
export class BannerController extends BaseController<CreateBannerDto> {
  constructor(
    private readonly bannerService: BannerService,
    private readonly transformRequest: TransformRequest,
  ) {
    super(bannerService, transformRequest);
    this.duplicatedPropertirs = ["page", "order"];
  }
}
