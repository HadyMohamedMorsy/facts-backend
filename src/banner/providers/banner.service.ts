import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { Repository } from "typeorm";
import { Banner } from "../banner.entity";
import { CreateBannerDto } from "../dtos/create-banner.dto";
import { PatchBannerDto } from "../dtos/patch-banner.dto";

@Injectable()
export class BannerService extends BaseService<Banner, CreateBannerDto, PatchBannerDto> {
  constructor(
    @InjectRepository(Banner)
    repository: Repository<Banner>,
    protected readonly apiService: APIFeaturesService,
  ) {
    super(repository, apiService);
  }
}
