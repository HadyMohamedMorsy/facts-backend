import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { AnyFilesInterceptor, NoFilesInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { Auth } from "src/auth/decorators/auth.decorator";
import { AuthType } from "src/auth/enums/auth-type.enum";
import { CategoryService } from "src/categories/providers/category.service";
import { BaseController } from "src/shared/common/base/base.controller";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { HeaderToBodyInterceptor } from "src/shared/common/interceptor/transfrom-request.interceptor";
import multerOptions from "src/shared/config/multer-options";
import { CreateMagazineDto } from "./dto/create-magazine.dto";
import { MagazineCategoriesDto } from "./dto/magazine-categories.dto";
import { MagazineService } from "./providers/magazine.service";

@Controller("magazine")
export class MagazineController extends BaseController<CreateMagazineDto> {
  constructor(
    private readonly magazineService: MagazineService,
    private readonly TransformRequest: TransformRequest,
    private readonly categoryService: CategoryService,
  ) {
    super(magazineService, TransformRequest);
    this.propertiesRel = ["created_by", "categories"];
  }

  @Post("/store")
  @UseInterceptors(HeaderToBodyInterceptor)
  @UseInterceptors(AnyFilesInterceptor(multerOptions))
  public async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createDto: CreateMagazineDto,
    @Req() request: Request,
  ) {
    const categoryIds = createDto.selectedCategories.map(
      (item: MagazineCategoriesDto) => item.value,
    );
    const categories = await this.categoryService.findMultipleCategories(categoryIds);
    const updateDto = { ...createDto, categories };
    return await super.create(files, updateDto, request);
  }

  @Delete("/delete")
  @UseInterceptors(NoFilesInterceptor())
  public async delete(@Body() body: { id: string }, @Req() request: Request) {
    const entity = await this.magazineService.findOne(+body.id, ["categories"]);
    await this.magazineService.deleteMagazineRelations(entity);
    return await super.delete(body, request);
  }

  @Post("front/index")
  @HttpCode(200)
  @Auth(AuthType.None)
  public front(@Body() filterQueryDto: FilterQueryDto) {
    return this.magazineService.front(filterQueryDto);
  }

  @Post("magazines/blogs")
  @HttpCode(200)
  @Auth(AuthType.None)
  public slug(@Body() filterQueryDto: FilterQueryDto) {
    return this.magazineService.findBySlugWithPaginatedBlogs(filterQueryDto);
  }
}
