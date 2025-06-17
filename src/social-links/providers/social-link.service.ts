import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { Repository } from "typeorm";
import { CreateSocialLinkDto } from "../dtos/create-social-link";
import { PatchSocialLinkDto } from "../dtos/patch-social-link.dto";
import { SocialLink } from "../social-link.entity";

@Injectable()
export class SocialLinkService extends BaseService<
  SocialLink,
  CreateSocialLinkDto,
  PatchSocialLinkDto
> {
  constructor(
    @InjectRepository(SocialLink)
    protected readonly repository: Repository<SocialLink>,
    protected readonly apiService: APIFeaturesService,
  ) {
    super(repository, apiService);
  }
}
