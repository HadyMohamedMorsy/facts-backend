import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { Profile } from "./profile.entity";
import { CreateProfileDto } from "./dtos/create-profile.dto";
import { PatchProfileDto } from "./dtos/patch-profile.dto";

@Injectable()
export class ProfileService
  extends BaseService<Profile, CreateProfileDto, PatchProfileDto>
  implements ICrudService<Profile, CreateProfileDto, PatchProfileDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Profile)
    repository: Repository<Profile>,
  ) {
    super(repository, apiFeaturesService);
  }
}
