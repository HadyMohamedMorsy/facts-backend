import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { Repository } from "typeorm";
import { RoleDto } from "../dto/role.dto";
import { Role } from "../role.entity";

@Injectable()
export class RoleService extends BaseService<Role, RoleDto, RoleDto> {
  constructor(
    @InjectRepository(Role)
    protected readonly repository: Repository<Role>,
    protected readonly apiService: APIFeaturesService,
  ) {
    super(repository, apiService);
  }
}
