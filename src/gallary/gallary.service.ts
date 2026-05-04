import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { Gallary } from "./gallary.entity";
import { CreateGallaryDto } from "./dtos/create-gallary.dto";
import { PatchGallaryDto } from "./dtos/patch-gallary.dto";

@Injectable()
export class GallaryService
  extends BaseService<Gallary, CreateGallaryDto, PatchGallaryDto>
  implements ICrudService<Gallary, CreateGallaryDto, PatchGallaryDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Gallary)
    repository: Repository<Gallary>,
  ) {
    super(repository, apiFeaturesService);
  }

  public override async findAll(filterData: any) {
    const queryBuilder = this.apiService
      .setRepository(this.repository.target)
      .buildQuery(filterData);

    this.queryRelationIndex(queryBuilder, filterData);

    queryBuilder
      .leftJoin("e.tab", "tab")
      .addSelect(["tab.id", "tab.content", "tab.slug", "tab.orderIndex"]);

    const filteredRecord = await queryBuilder.getMany();
    const totalRecords = await queryBuilder.getCount();

    return this.response(filteredRecord, totalRecords);
  }

  override async findFront(query: {
    query?: {
      filters?: Record<string, any>;
      page?: number;
      limit?: number;
      [k: string]: any;
    };
  }) {
    const queryParams = query?.query;
    const filters = queryParams?.filters ?? {};
    const page = Number(queryParams?.page) || 1;
    const limit = Number(queryParams?.limit) || 10;
    const tabId = filters.tabId;

    let qb = this.repository
      .createQueryBuilder("e")
      .leftJoinAndSelect("e.tab", "tab")
      .andWhere("e.isActive = :isActive", { isActive: true });

    if (tabId != null) {
      qb = qb.andWhere("tab.id = :tabId", { tabId: +tabId });
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (key !== "tabId" && value != null && value !== "") {
        qb = qb.andWhere(`e.${key} = :${key}`, { [key]: value });
      }
    });

    qb = qb.orderBy("e.orderIndex", "ASC");

    // Gallery page consumes files grouped by selected tab.
    // Returning file-level pagination avoids losing records when multiple
    // gallery rows exist under the same tab.
    if (tabId != null) {
      const rows = await qb.getMany();
      const allFiles = rows.flatMap(row => row.files ?? []).filter(Boolean);
      const totalFiles = allFiles.length;
      const skip = limit > 0 ? (page - 1) * limit : 0;
      const paginatedFiles = limit > 0 ? allFiles.slice(skip, skip + limit) : allFiles;
      return { data: paginatedFiles, totalRecords: totalFiles };
    }

    const total = await qb.getCount();
    const skip = limit > 0 ? (page - 1) * limit : 0;
    const data = await qb
      .skip(skip)
      .take(limit > 0 ? limit : undefined)
      .getMany();
    return { data, totalRecords: total };
  }
}
