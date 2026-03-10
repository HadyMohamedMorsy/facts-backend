import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { CreateGraduateDto } from "./dtos/create-graduate.dto";
import { PatchGraduateDto } from "./dtos/patch-graduate.dto";
import { Graduates } from "./graduates.entity";

@Injectable()
export class GraduatesService
  extends BaseService<Graduates, CreateGraduateDto, PatchGraduateDto>
  implements ICrudService<Graduates, CreateGraduateDto, PatchGraduateDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Graduates)
    repository: Repository<Graduates>,
  ) {
    super(repository, apiFeaturesService);
  }

  async findBySlug(slug: string) {
    const graduate = await this.repository.findOne({
      where: { slug },
      relations: ["user"],
    });
    if (!graduate) {
      throw new NotFoundException(`Graduate with slug '${slug}' not found`);
    }
    return { data: graduate };
  }
}
