import { Controller } from "@nestjs/common";
import { BaseController } from "src/shared/common/base/base.controller";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { CreatePatchDto } from "./dtos/create-patch.dto";
import { PatchService } from "./providers/patch.service";

@Controller("patch")
export class PatchController extends BaseController<CreatePatchDto> {
  constructor(
    private readonly patchService: PatchService,
    private readonly TransformRequest: TransformRequest,
  ) {
    super(patchService, TransformRequest);
    this.duplicatedPropertirs = ["order"];
  }
}
