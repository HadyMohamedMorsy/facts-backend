import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LanguageService } from "src/languages/providers/language.service";
import { BaseService } from "src/shared/common/base/base.service";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { UserService } from "src/users/providers/user.service";
import { Repository } from "typeorm";
import { CreateEducationsDto } from "../dtos/create-educations.dto";
import { Education } from "../education.entity";

@Injectable()
export class EducationService extends BaseService<Education, CreateEducationsDto> {
  constructor(
    @InjectRepository(Education)
    repository: Repository<Education>,
    filterData: FilterDataProvider<Education>,
    usersService: UserService,
    languageService: LanguageService,
  ) {
    super(repository, filterData, usersService, languageService);
  }

  async findBySlug(slug: string) {
    const education = await this.repository.findOne({
      where: { slug },
      relations: ["education_accordion", "education_details"], // Add any relations you need
    });

    if (!education) {
      throw new NotFoundException(`Education with slug '${slug}' not found`);
    }

    return {
      data: education,
    };
  }

  async front(filter: FilterQueryDto) {
    const entity = await this.filtersFront(filter, "education").execute();
    return {
      data: entity,
    };
  }

  async findAll(filter: FilterQueryDto) {
    const entity = await this.filters(filter, "education")
      .joinRelations(["education_accordion", "education_details"])
      .provideFields(["featuredImage", "short_description"])
      .execute();
    const result = await this.filters(filter, "education").count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }
}
