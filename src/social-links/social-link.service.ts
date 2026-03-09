import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { SocialLink } from "./social-link.entity";
import { CreateSocialLinkDto } from "./dtos/create-social-link.dto";
import { PatchSocialLinkDto } from "./dtos/patch-social-link.dto";

@Injectable()
export class SocialLinkService
  extends BaseService<SocialLink, CreateSocialLinkDto, PatchSocialLinkDto>
  implements ICrudService<SocialLink, CreateSocialLinkDto, PatchSocialLinkDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(SocialLink)
    repository: Repository<SocialLink>,
  ) {
    super(repository, apiFeaturesService);
  }
}
