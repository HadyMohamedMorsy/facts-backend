import { Controller } from "@nestjs/common";
import { BaseController } from "src/shared/common/base/base.controller";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { CreateSettingDto } from "./dtos/create-setting.dto";
import { SettingsService } from "./providers/settings.service";

@Controller("setting")
export class SettingsController extends BaseController<CreateSettingDto> {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly TransformRequest: TransformRequest,
  ) {
    super(settingsService, TransformRequest);
    this.duplicatedPropertirs = ["order", "slug"];
  }
}
