import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { Repository } from "typeorm";
import { Category } from "../category.entity";
import { CreateCategoryDto } from "../dto/create-category.dto";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
    private readonly filterData: FilterDataProvider<Category>,
  ) {}

  public async create(create: CreateCategoryDto) {
    const data = this.repository.create(create);
    return await this.repository.save(data);
  }

  public async findAll(filter: FilterQueryDto) {
    const entity = await this.filterData
      .initRepositry("category", this.repository, filter)
      .filter()
      .provideFields()
      .sort()
      .paginate()
      .search()
      .execute();
    return entity;
  }

  public async delete(id: number) {
    await this.repository.delete(id);
    return { deleted: true, id };
  }
}