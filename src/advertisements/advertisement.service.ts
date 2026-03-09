import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { Advertisement } from "./advertisement.entity";
import { CreatAdvertisementDto } from "./dtos/create-advertisements.dto";
import { PatchAdvertisementDto } from "./dtos/patch-advertisements.dto";

@Injectable()
export class AdvertisementService
  extends BaseService<Advertisement, CreatAdvertisementDto, PatchAdvertisementDto>
  implements ICrudService<Advertisement, CreatAdvertisementDto, PatchAdvertisementDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Advertisement)
    repository: Repository<Advertisement>,
  ) {
    super(repository, apiFeaturesService);
  }
}
