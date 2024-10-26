import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogsModule } from "src/blogs/blogs.module";
import { MagazinesModule } from "src/magazines/magazines.module";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { CategoryController } from "./category.controller";
import { Category } from "./category.entity";
import { CategoryService } from "./providers/category.service";

@Module({
  imports: [
    UsersModule,
    BlogsModule,
    FilterDateModule,
    forwardRef(() => MagazinesModule),
    TypeOrmModule.forFeature([Category]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
