import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { Repository } from "typeorm";
import { Advertisement } from "../advertisement.entity";
import { CreatAdvertisementDto } from "../dtos/create-advertisements.dto";
import { PatchBannerDto } from "../dtos/patch-advertisements.dto";

@Injectable()
export class AdvertisementService extends BaseService<
  Advertisement,
  CreatAdvertisementDto,
  PatchBannerDto
> {
  constructor(
    @InjectRepository(Advertisement)
    repository: Repository<Advertisement>,
    protected readonly apiService: APIFeaturesService,
  ) {
    super(repository, apiService);
  }
}
