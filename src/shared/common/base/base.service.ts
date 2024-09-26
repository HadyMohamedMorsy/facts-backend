import { Injectable, NotFoundException } from "@nestjs/common";
import { join } from "path"; // To handle file paths
import { IBaseService } from "src/shared/common/base/service.types";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";

interface BaseEntity {
  id: number;
  featuredImage?: string;
  files?: string;
}

@Injectable()
export abstract class BaseService<T extends BaseEntity, CreateDto>
  implements IBaseService<CreateDto>
{
  constructor(
    protected readonly repository: Repository<T>,
    protected readonly filterData: FilterDataProvider<T>,
  ) {}

  abstract findAll(filter: FilterQueryDto): Promise<any>;

  async create(createDto: CreateDto): Promise<T> {
    const entity = this.repository.create(createDto as DeepPartial<T>);
    return this.repository.save(entity);
  }

  filters(filter: FilterQueryDto, entityType: string) {
    const entity = this.filterData
      .initRepositry(entityType, this.repository, filter)
      .filter()
      .sort()
      .paginate()
      .search()
      .filterByLanguage();

    return entity;
  }

  async delete(id: number) {
    const record = await this.repository.findOne({ where: { id } as FindOptionsWhere<T> });

    if (!record) {
      throw new NotFoundException(`Record with id ${id} not found`);
    }

    const filePath = join(__dirname, "..", "..", "uploads", record.featuredImage.split("/").pop());
    console.log(filePath);
    // if (record.featuredImage) {
    //   try {
    //     // Construct the full path to the file (adjust if necessary)
    //     const filePath = join(
    //       __dirname,
    //       "..",
    //       "..",
    //       "uploads",
    //       record.featuredImage.split("/").pop(),
    //     );
    //     await unlink(filePath);
    //   } catch (err) {
    //     console.error(`Error deleting file: ${err.message}`);
    //   }
    // }

    // await this.repository.delete(id);
    return { deleted: true, id };
  }
}
