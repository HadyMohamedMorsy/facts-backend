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

  override async findFront(query: { query?: { filters?: Record<string, any>; [k: string]: any } }) {
    const queryParams = query?.query;
    const tabId = queryParams?.filters?.tabId;
    let qb = this.repository.createQueryBuilder("e");
    qb = qb.andWhere("e.isActive = :isActive", { isActive: true });
    if (tabId != null) {
      qb = qb.innerJoin("e.tab", "tab").andWhere("tab.id = :tabId", { tabId: +tabId });
    }
    const [data, total] = await qb
      .orderBy("e.orderIndex", "ASC")
      .getManyAndCount();
    return { data, totalRecords: total };
  }
}
