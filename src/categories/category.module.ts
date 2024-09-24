import { CategoryService } from "./providers/category.service";
/*
https://docs.nestjs.com/modules
*/

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { Category } from "./category.entity";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Category])],
  controllers: [],
  providers: [CategoryService],
})
export class CategoryModule {}
