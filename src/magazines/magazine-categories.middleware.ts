import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Category } from "src/categories/category.entity";

@Injectable()
export class MagazineCategoriesRelationMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const categoryIds =
      req.body?.categoryIds ??
      req.body?.selectedCategories?.map((x: { value: number }) => x.value)?.filter(Boolean);

    if (!categoryIds || !Array.isArray(categoryIds) || categoryIds.length === 0) {
      throw new BadRequestException(
        "Missing category ids in body (categoryIds or selectedCategories)",
      );
    }

    const ids = categoryIds.map((id: number) => +id).filter((id: number) => id > 0);
    if (ids.length === 0) {
      throw new BadRequestException("No valid category ids");
    }

    const categories = await this.categoryRepository
      .createQueryBuilder("c")
      .where("c.id IN (:...ids)", { ids })
      .getMany();

    if (categories.length !== ids.length) {
      throw new BadRequestException("One or more category ids not found");
    }

    req["categories"] = categories;
    next();
  }
}
