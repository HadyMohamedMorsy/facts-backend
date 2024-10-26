import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/common/base/base.service";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { UserService } from "src/users/providers/user.service";
import { Repository } from "typeorm";
import { CreatePatchDto } from "../dtos/create-patch.dto";
import { PatchGraduates } from "../patch.entity";

@Injectable()
export class PatchService extends BaseService<PatchGraduates, CreatePatchDto> {
  constructor(
    @InjectRepository(PatchGraduates)
    repository: Repository<PatchGraduates>,
    filterData: FilterDataProvider<PatchGraduates>,
    usersService: UserService,
  ) {
    super(repository, filterData, usersService);
  }

  async front(filter: FilterQueryDto) {
    const entity = await this.filtersFront(filter, "patchGraduates")
      .filterByActive()
      .orderByOrder()
      .execute();
    return {
      data: entity,
    };
  }

  async findAll(filter: FilterQueryDto) {
    const entity = await this.filters(filter, "patchGraduates")
      .provideFields(["files", "description_en", "description_ar"])
      .orderByOrder()
      .execute();
    const result = await this.filters(filter, "patchGraduates").count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }
}
