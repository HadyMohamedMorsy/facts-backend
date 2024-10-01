import { Controller, Get, Param } from "@nestjs/common";
import { BaseController } from "src/shared/common/base/base.controller";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { CreateEducationsDto } from "./dtos/create-educations.dto";
import { EducationService } from "./providers/education.service";

@Controller("education")
export class EducationController extends BaseController<CreateEducationsDto> {
  constructor(
    private readonly educationService: EducationService,
    private readonly TransformRequest: TransformRequest,
  ) {
    super(educationService, TransformRequest);
    this.propertiesRel = ["education_accordion", "education_details"];
  }

  @Get(":slug")
  async findBySlug(@Param("slug") slug: string) {
    return this.educationService.findBySlug(slug);
  }
}
