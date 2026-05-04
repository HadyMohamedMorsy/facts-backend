import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository, SelectQueryBuilder } from "typeorm";
import { CreateGraduateDto } from "./dtos/create-graduate.dto";
import { PatchGraduateDto } from "./dtos/patch-graduate.dto";
import { Graduates } from "./graduates.entity";

@Injectable()
export class GraduatesService
  extends BaseService<Graduates, CreateGraduateDto, PatchGraduateDto>
  implements ICrudService<Graduates, CreateGraduateDto, PatchGraduateDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Graduates)
    repository: Repository<Graduates>,
  ) {
    super(repository, apiFeaturesService);
  }

  protected override queryRelationIndex(
    queryBuilder?: SelectQueryBuilder<Graduates>,
    filteredRecord?: any,
  ) {
    super.queryRelationIndex(queryBuilder, filteredRecord);
    if (!queryBuilder) return;

    queryBuilder
      .leftJoin("e.user", "graduateUser")
      .addSelect([
        "graduateUser.id",
        "graduateUser.username",
        "graduateUser.firstName",
        "graduateUser.lastName",
        "graduateUser.email",
      ]);
  }

  protected override applyFilters(
    queryBuilder: SelectQueryBuilder<Graduates>,
    filters?: Record<string, any>,
  ) {
    if (!filters) return queryBuilder;

    const allowedFilters = new Set([
      "isActive",
      "dateCourse",
      "courseName",
      "codeCertification",
      "type",
      "slug",
    ]);

    Object.entries(filters).forEach(([key, value]) => {
      if (!allowedFilters.has(key)) return;
      if (value === undefined || value === null || value === "") return;

      if (["courseName", "codeCertification"].includes(key)) {
        queryBuilder.andWhere(`e.${key} LIKE :${key}`, {
          [key]: `%${value}%`,
        });
        return;
      }

      queryBuilder.andWhere(`e.${key} = :${key}`, { [key]: value });
    });

    return queryBuilder;
  }

  async findBySlug(slug: string) {
    const graduate = await this.repository.findOne({
      where: { slug },
      relations: ["user"],
    });
    if (!graduate) {
      throw new NotFoundException(`Graduate with slug '${slug}' not found`);
    }
    return { data: graduate };
  }
}
