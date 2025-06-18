import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BlogService } from "src/blogs/providers/blog.service";
import { MagazineService } from "src/magazines/providers/magazine.service";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { In, Repository } from "typeorm";
import { Category } from "../category.entity";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { PatchCategoryDto } from "../dto/patch-category.dto";

@Injectable()
export class CategoryService extends BaseService<Category, CreateCategoryDto, PatchCategoryDto> {
  constructor(
    @InjectRepository(Category)
    repository: Repository<Category>,
    protected readonly apiService: APIFeaturesService,
    private readonly blogService: BlogService,
    @Inject(forwardRef(() => MagazineService))
    private readonly magazineService: MagazineService,
  ) {
    super(repository, apiService);
  }

  public async findMultipleCategories(categories: number[]) {
    const results = await this.repository.find({
      where: {
        id: In(categories),
        is_active: true,
      },
    });

    return results;
  }
}
