import { Controller } from "@nestjs/common";
import { BaseController } from "src/shared/common/base/base.controller";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { CreateConsultancyDto } from "./dtos/create-consultancy.dto";
import { ConsultancyService } from "./providers/consultancy.service";

@Controller("consultancy")
export class ConsultancyController extends BaseController<CreateConsultancyDto> {
  constructor(
    private readonly consultancyService: ConsultancyService,
    private readonly TransformRequest: TransformRequest,
  ) {
    super(consultancyService, TransformRequest);
    this.propertiesRel = ["consultancy_accordion"];
  }
}
