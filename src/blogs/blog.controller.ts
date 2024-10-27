import { Controller, Get, Param } from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth.decorator";
import { AuthType } from "src/auth/enums/auth-type.enum";
import { BaseController } from "src/shared/common/base/base.controller";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { CreateBlogsDto } from "./dto/create-blogs-blogs.dto";
import { BlogService } from "./providers/blog.service";

@Controller("blog")
export class BlogController extends BaseController<CreateBlogsDto> {
  constructor(
    private readonly blogService: BlogService,
    private readonly transformRequest: TransformRequest,
  ) {
    super(blogService, transformRequest);
    this.propertiesRel = ["created_by", "magazine"];
  }

  @Get(":slug")
  @Auth(AuthType.None)
  async findBySlug(@Param("slug") slug: string) {
    return this.blogService.findBySlug(slug);
  }
}
