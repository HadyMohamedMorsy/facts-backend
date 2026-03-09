import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { Subscribe } from "./subscribtion.entity";
import { CreateSubscribeDto } from "./dtos/create-subscribe.dto";
import { PatchSubscribeDto } from "./dtos/patch-subscribe.dto";

@Injectable()
export class SubscribtionService
  extends BaseService<Subscribe, CreateSubscribeDto, PatchSubscribeDto>
  implements ICrudService<Subscribe, CreateSubscribeDto, PatchSubscribeDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Subscribe)
    repository: Repository<Subscribe>,
  ) {
    super(repository, apiFeaturesService);
  }
}
