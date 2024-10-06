import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { CategoryController } from "./category.controller";
import { Category } from "./category.entity";
import { CategoryService } from "./providers/category.service";

@Module({
  imports: [UsersModule, FilterDateModule, TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
