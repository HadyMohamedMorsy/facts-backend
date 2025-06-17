import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { Repository } from "typeorm";
import { CreateProfiletDto } from "../dtos/create-profile";
import { PatchProfileDto } from "../dtos/patch-profile.dto";
import { Profile } from "../profile.entity";

@Injectable()
export class ProfileService extends BaseService<Profile, CreateProfiletDto, PatchProfileDto> {
  constructor(
    @InjectRepository(Profile)
    protected readonly repository: Repository<Profile>,
    protected readonly apiService: APIFeaturesService,
  ) {
    super(repository, apiService);
  }
}
