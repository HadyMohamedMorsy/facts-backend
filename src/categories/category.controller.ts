import { Controller } from "@nestjs/common";
import { BaseController } from "src/shared/common/base/base.controller";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { CategoryService } from "./providers/category.service";

@Controller("category")
export class CategoryController extends BaseController<CreateCategoryDto> {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly TransformRequest: TransformRequest,
  ) {
    super(categoryService, TransformRequest);
  }
}
