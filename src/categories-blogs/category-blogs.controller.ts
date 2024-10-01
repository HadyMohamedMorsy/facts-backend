import { Controller } from "@nestjs/common";
import { BaseController } from "src/shared/common/base/base.controller";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { CreateCategoryBlogsDto } from "./dto/create-category-blogs.dto";
import { CategoryBlogsService } from "./providers/category-blogs.service";
@Controller("category-blogs")
export class CategoryBlogsController extends BaseController<CreateCategoryBlogsDto> {
  constructor(
    private readonly CategoryBlogsService: CategoryBlogsService,
    private readonly TransformRequest: TransformRequest,
  ) {
    super(CategoryBlogsService, TransformRequest);
  }
}
