// list.service.ts
import { Injectable } from "@nestjs/common";
import { CategoryService } from "src/categories/category.service";
import { EducationService } from "src/educations/education.service";
import { TabService } from "src/tab/tab.service";
import {
  getArticleTypeList,
  getCategoryTypeList,
  getMediaTypeList,
  getRoleList,
} from "../utilties/get-flobal-list-from-enum.utils";

@Injectable()
export class ListService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly educationService: EducationService,
    private readonly tabService: TabService,
  ) {}
  private lists = {
    roles: getRoleList(),
    mediaType: getMediaTypeList(),
    articleType: getArticleTypeList(),
    categoryType: getCategoryTypeList(),
  };

  async getListsBySlug(slug: string) {
    switch (slug) {
      case "user":
        return {
          roles: this.lists.roles,
        };
      case "blog":
        return {
          category: await this.categoryService.getList(),
        };
      case "tab":
        return await this.tabService.getList({ isActive: true });
      case "education":
        return await this.educationService.getList();

      default:
        throw new Error(`Slug "${slug}" not supported`);
    }
  }
}
