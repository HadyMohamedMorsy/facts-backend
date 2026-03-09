import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { Banner } from "./banner.entity";
import { CreateBannerDto } from "./dtos/create-banner.dto";
import { PatchBannerDto } from "./dtos/patch-banner.dto";

@Injectable()
export class BannerService
  extends BaseService<Banner, CreateBannerDto, PatchBannerDto>
  implements ICrudService<Banner, CreateBannerDto, PatchBannerDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Banner)
    repository: Repository<Banner>,
  ) {
    super(repository, apiFeaturesService);
  }
}
