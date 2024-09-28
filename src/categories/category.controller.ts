import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { BaseController } from "src/shared/common/base/base.controller";
import { HeaderToBodyInterceptor } from "src/shared/common/interceptor/transfrom-request.interceptor";
import multerOptions from "src/shared/config/multer-options";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { PatchCategoryDto } from "./dto/patch-category.dto";
import { CategoryService } from "./providers/category.service";

@Controller("category")
export class CategoryController extends BaseController<CreateCategoryDto> {
  constructor(private readonly categoryService: CategoryService) {
    super(categoryService);
  }

  @Post("/update")
  @UseInterceptors(HeaderToBodyInterceptor)
  @UseInterceptors(FileInterceptor("featuredImage", multerOptions))
  public async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() patch: PatchCategoryDto,
    @Req() request: Request,
  ) {
    const { id } = patch;
    const entity = await this.categoryService.findOne(+id);
    const updatedDto = this.transformUpdate(file, patch, request, entity);
    return this.categoryService.update(+id, entity, updatedDto);
  }
}
