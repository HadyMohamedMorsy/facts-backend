import { Controller, Get, Param } from "@nestjs/common";
import { BaseController } from "src/shared/common/base/base.controller";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { CreateMagazineDto } from "./dto/create-magazine.dto";
import { MagazineService } from "./providers/magazine.service";

@Controller("magazine")
export class MagazineController extends BaseController<CreateMagazineDto> {
  constructor(
    private readonly magazineService: MagazineService,
    private readonly TransformRequest: TransformRequest,
  ) {
    super(magazineService, TransformRequest);
    this.propertiesRel = ["categories_objects"];
  }

  @Get(":slug")
  async findBySlug(@Param("slug") slug: string) {
    return this.magazineService.findBySlug(slug);
  }
}
