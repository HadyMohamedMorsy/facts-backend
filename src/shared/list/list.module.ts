// list.module.ts
import { Module } from "@nestjs/common";
import { CategoryModule } from "src/categories/category.module";
import { EducationModule } from "src/educations/education.module";
import { TabModule } from "src/tab/tab.module";
import { ListController } from "./list.controller";
import { ListService } from "./list.service";

@Module({
  imports: [CategoryModule, EducationModule, TabModule],
  providers: [ListService],
  controllers: [ListController],
  exports: [ListService],
})
export class ListModule {}
