import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { PatchGraduates } from "./patch.entity";
import { CreatePatchDto } from "./dtos/create-patch.dto";
import { PatchPatchDto } from "./dtos/patch-patch.dto";

@Injectable()
export class PatchService
  extends BaseService<PatchGraduates, CreatePatchDto, PatchPatchDto>
  implements ICrudService<PatchGraduates, CreatePatchDto, PatchPatchDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(PatchGraduates)
    repository: Repository<PatchGraduates>,
  ) {
    super(repository, apiFeaturesService);
  }
}
