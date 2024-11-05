import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/common/base/base.service";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { UserService } from "src/users/providers/user.service";
import { Repository } from "typeorm";
import { CreateGraduatestDto } from "../dtos/create-graduates";
import { Graduates } from "../graduates.entity";

@Injectable()
export class GraduatesService extends BaseService<Graduates, CreateGraduatestDto> {
  constructor(
    @InjectRepository(Graduates)
    repository: Repository<Graduates>,
    filterData: FilterDataProvider<Graduates>,
    usersService: UserService,
  ) {
    super(repository, filterData, usersService);
  }

  async front(filter: FilterQueryDto) {
    const entity = await this.filtersFront(filter, "graduates")
      .joinRelations("user", [
        "username",
        "firstName",
        "lastName",
        "phone_number",
        "country",
        "email",
        "gender",
        "address",
        "id",
      ])
      .dynamicFilter({
        type: { type: "where", value: "facts" },
        course_name: { type: "search", value: filter.filters?.course_name },
        code_certification: { type: "search", value: filter.filters?.code_certification },
      })
      .searchFrontRelation({
        "user.username": "hady12318",
      })
      .filterByActive()
      .execute();
    return {
      data: entity,
    };
  }

  async findBySlug(slug: string) {
    const education = await this.repository.findOne({
      where: { slug },
      relations: ["user"], // Add any relations you need
    });

    if (!education) {
      throw new NotFoundException(`Education with slug '${slug}' not found`);
    }

    return {
      data: education,
    };
  }

  async findAll(filter: FilterQueryDto) {
    const entity = await this.filters(filter, "graduates")
      .provideFields([
        "featuredImage",
        "description_en",
        "description_ar",
        "course_name",
        "code_certification",
        "date_course",
        "attachment",
        "image_certification",
        "type",
        "courses",
        "slug",
        "selectUser",
      ])
      .joinRelations("user", ["username", "id"])
      .execute();
    const result = await this.filters(filter, "graduates").count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }
}
