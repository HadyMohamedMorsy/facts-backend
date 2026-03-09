import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { Tab } from "./tab.entity";
import { CreateTabDto } from "./dtos/create-tab.dto";
import { PatchTabDto } from "./dtos/patch-tab.dto";

@Injectable()
export class TabService
  extends BaseService<Tab, CreateTabDto, PatchTabDto>
  implements ICrudService<Tab, CreateTabDto, PatchTabDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Tab)
    repository: Repository<Tab>,
  ) {
    super(repository, apiFeaturesService);
  }
}
