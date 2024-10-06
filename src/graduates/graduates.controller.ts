import { Controller } from "@nestjs/common";
import { BaseController } from "src/shared/common/base/base.controller";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { CreateGraduatestDto } from "./dtos/create-graduates";
import { GraduatesService } from "./providers/graduates.service";

@Controller("graduates")
export class GraduatesController extends BaseController<CreateGraduatestDto> {
  constructor(
    private readonly graduatesService: GraduatesService,
    private readonly transformRequest: TransformRequest,
  ) {
    super(graduatesService, transformRequest);
  }
}
