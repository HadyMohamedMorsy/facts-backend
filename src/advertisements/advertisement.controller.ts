import { Controller } from "@nestjs/common";
import { BaseController } from "src/shared/common/base/base.controller";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { CreatAdvertisementDto } from "./dtos/create-advertisements.dto";
import { AdvertisementService } from "./providers/advertisement.service";

@Controller("advertisement")
export class AdvertisementServiceController extends BaseController<CreatAdvertisementDto> {
  constructor(
    private readonly advertisementService: AdvertisementService,
    private readonly transformRequest: TransformRequest,
  ) {
    super(advertisementService, transformRequest);
    this.duplicatedPropertirs = ["order"];
  }
}
