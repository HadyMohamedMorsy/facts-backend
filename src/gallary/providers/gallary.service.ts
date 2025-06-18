import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { Repository } from "typeorm";
import { CreateGallarysDto } from "../dtos/create-gallary.dto";
import { PatchGallaryDto } from "../dtos/patch-gallary.dto";
import { Gallary } from "../gallary.entity";

@Injectable()
export class GallaryService extends BaseService<Gallary, CreateGallarysDto, PatchGallaryDto> {
  constructor(
    @InjectRepository(Gallary)
    repository: Repository<Gallary>,
    protected readonly apiService: APIFeaturesService,
  ) {
    super(repository, apiService);
  }
}
