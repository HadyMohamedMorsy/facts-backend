import { Controller } from "@nestjs/common";
import { BaseController } from "src/shared/common/base/base.controller";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { CreateHeroSliderDto } from "./dtos/create-hero-slider.dto";
import { HeroSliderService } from "./providers/hero-slider.service";

@Controller("slider")
export class HeroSliderController extends BaseController<CreateHeroSliderDto> {
  constructor(
    private readonly heroSliderService: HeroSliderService,
    private readonly TransformRequest: TransformRequest,
  ) {
    super(heroSliderService, TransformRequest);
    this.duplicatedPropertirs = ["order"];
  }
}
