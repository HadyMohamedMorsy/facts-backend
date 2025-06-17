import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { Repository } from "typeorm";
import { CreateSubscribeDto } from "../dtos/create-subscribe";
import { PatchSubscribeDto } from "../dtos/patch-subscribe.dto";
import { Subscribe } from "../subscribtion.entity";

@Injectable()
export class SubscribtionService extends BaseService<
  Subscribe,
  CreateSubscribeDto,
  PatchSubscribeDto
> {
  constructor(
    @InjectRepository(Subscribe)
    protected readonly repository: Repository<Subscribe>,
    protected readonly apiService: APIFeaturesService,
  ) {
    super(repository, apiService);
  }
}
