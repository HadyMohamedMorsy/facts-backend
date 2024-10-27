import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BlogService } from "src/blogs/providers/blog.service";
import { MagazineService } from "src/magazines/providers/magazine.service";
import { BaseService } from "src/shared/common/base/base.service";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { UserService } from "src/users/providers/user.service";
import { In, Repository } from "typeorm";
import { Category } from "../category.entity";
import { CreateCategoryDto } from "../dto/create-category.dto";

@Injectable()
export class CategoryService extends BaseService<Category, CreateCategoryDto> {
  constructor(
    @InjectRepository(Category)
    repository: Repository<Category>,
    filterData: FilterDataProvider<Category>,
    usersService: UserService,
    private readonly blogService: BlogService,

    // Injecting UserService
    @Inject(forwardRef(() => MagazineService))
    private readonly magazineService: MagazineService,
  ) {
    super(repository, filterData, usersService);
  }

  async front(filter: FilterQueryDto) {
    const entity = await this.filtersFront(filter, "category")
      .joinInnerRelations("magazines", ["title_ar", "title_en"])
      .filterByActive()
      .orderByOrder()
      .execute();

    return {
      data: entity,
    };
  }

  async autoComplete(filter: FilterQueryDto) {
    const entity = await this.filtersFront(filter, "category")
      .searchFrontOnly(filter.search, ["name_en", "name_ar"])
      .filterByActive()
      .orderByOrder()
      .execute();
    return {
      data: entity,
    };
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

  async findAll(filter: FilterQueryDto) {
    const entity = await this.filters(filter, "category").orderByOrder().execute();
    const result = await this.filters(filter, "category").count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }

  async deleteCategoriesRelations(entity: Category): Promise<void> {
    if (!entity) {
      throw new NotFoundException("Magazine not found");
    }
    if (entity.magazines && entity.magazines.length > 0) {
      for (const magazine of entity.magazines) {
        for (const blog of magazine.blogs) {
          await this.blogService.delete(blog.id, "blog");
        }
      }
    }

    if (entity.magazines && entity.magazines.length > 0) {
      for (const magazine of entity.magazines) {
        await this.magazineService.delete(magazine.id, "magazine");
      }
    }
  }
}
