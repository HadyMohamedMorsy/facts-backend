import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { Repository } from "typeorm";
import { CreateSettingDto } from "../dtos/create-setting.dto";
import { patchSettingDto } from "../dtos/patch-setting.dto";
import { Settings } from "../setting.entity";

@Injectable()
export class SettingsService extends BaseService<Settings, CreateSettingDto, patchSettingDto> {
  constructor(
    @InjectRepository(Settings)
    protected readonly repository: Repository<Settings>,
    protected readonly apiService: APIFeaturesService,
  ) {
    super(repository, apiService);
  }
}
