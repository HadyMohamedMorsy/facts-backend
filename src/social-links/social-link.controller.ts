import { Controller } from "@nestjs/common";
import { BaseController } from "src/shared/common/base/base.controller";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { CreateSocialLinkDto } from "./dtos/create-social-link";
import { SocialLinkService } from "./providers/social-link.service";
@Controller("social-link")
export class SocialLinkController extends BaseController<CreateSocialLinkDto> {
  constructor(
    private readonly socialLinkService: SocialLinkService,
    private readonly transformRequest: TransformRequest,
  ) {
    super(socialLinkService, transformRequest);
    this.duplicatedPropertirs = ["order"];
  }
}
