import { Controller } from "@nestjs/common";
import { BaseController } from "src/shared/common/base/base.controller";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { CreatePartnersDto } from "./dtos/create-partners.dto";
import { PartnersService } from "./providers/partners.service";

@Controller("partner")
export class PartnersController extends BaseController<CreatePartnersDto> {
  constructor(
    private readonly partnerService: PartnersService,
    private readonly TransformRequest: TransformRequest,
  ) {
    super(partnerService, TransformRequest);
    this.duplicatedPropertirs = ["order"];
  }
}
