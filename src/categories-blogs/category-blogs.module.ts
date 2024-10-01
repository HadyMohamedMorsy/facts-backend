import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LanguagesModule } from "src/languages/languages.module";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { CategoryBlogsController } from "./category-blogs.controller";
import { CategoryBlog } from "./category-blogs.entity";
import { CategoryBlogsService } from "./providers/category-blogs.service";

@Module({
  imports: [
    UsersModule,
    LanguagesModule,
    FilterDateModule,
    TypeOrmModule.forFeature([CategoryBlog]),
  ],
  controllers: [CategoryBlogsController],
  providers: [CategoryBlogsService],
})
export class CategoryBlogsModule {}
