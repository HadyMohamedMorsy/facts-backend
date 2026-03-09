import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Blog } from "src/blogs/blog.entity";
import { BlogModule } from "src/blogs/blog.module";
import { Category } from "src/categories/category.entity";
import { CategoryModule } from "src/categories/category.module";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { MagazineCategoriesRelationMiddleware } from "./magazine-categories.middleware";
import { MagazineController } from "./magazine.controller";
import { Magazine } from "./magazine.entity";
import { MagazineService } from "./magazine.service";

@Module({
  imports: [
    FilterDateModule,
    TypeOrmModule.forFeature([Magazine, Category, Blog]),
    CategoryModule,
    BlogModule,
  ],
  controllers: [MagazineController],
  providers: [MagazineService, MagazineCategoriesRelationMiddleware],
  exports: [MagazineService],
})
export class MagazinesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MagazineCategoriesRelationMiddleware)
      .forRoutes(
        { path: "magazine/store", method: RequestMethod.POST },
        { path: "magazine/update", method: RequestMethod.PUT },
      );
  }
}
