import { Controller } from "@nestjs/common";
import { BaseController } from "src/shared/common/base/base.controller";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { CreateProfiletDto } from "./dtos/create-profile";
import { ProfileService } from "./providers/profile.service";

@Controller("profile")
export class ProfileController extends BaseController<CreateProfiletDto> {
  constructor(
    private readonly profileService: ProfileService,
    private readonly TransformRequest: TransformRequest,
  ) {
    super(profileService, TransformRequest);
    this.duplicatedPropertirs = [];
  }
}
