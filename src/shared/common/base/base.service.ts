import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { unlink } from "fs";
import { join } from "path";
import { IBaseService } from "src/shared/common/base/service.types";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { UserService } from "../../../users/providers/user.service";
interface BaseEntity {
  id: number;
  featuredImage?: string;
  files?: string[];
}

@Injectable()
export abstract class BaseService<T extends BaseEntity, CreateDto>
  implements IBaseService<CreateDto>
{
  constructor(
    protected readonly repository: Repository<T>,
    protected readonly filterData: FilterDataProvider<T>,
    private readonly usersService: UserService,
  ) {}

  abstract front(filter: FilterQueryDto): Promise<any>;
  abstract findAll(filter: FilterQueryDto): Promise<any>;

  async findOne(id: number, relations: string[] = []): Promise<T> {
    let entity = undefined;

    if (relations.length) {
      entity = await this.repository.findOne({
        where: { id } as FindOptionsWhere<T>,
        relations,
      });
    } else {
      entity = await this.repository.findOne({
        where: { id } as FindOptionsWhere<T>,
      });
    }

    if (!entity) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }

    return entity;
  }

  async create(createDto: CreateDto, relationProp?: any): Promise<T> {
    const { created_by } = createDto as any;

    let createdBy = undefined;

    try {
      createdBy = await this.usersService.findOneById(created_by);
    } catch (error) {
      throw new ConflictException(error);
    }

    const entity = this.repository.create({
      ...createDto,
      ...relationProp,
      createdBy,
    } as DeepPartial<T>);

    await this.repository.save(entity);

    const result = await this.repository.findOne({
      where: { id: entity.id } as FindOptionsWhere<T>,
      relations: ["created_by"],
    });

    if (!result) {
      throw new NotFoundException(`Entity with ID ${entity.id} not found`);
    }

    return result;
  }

  async update(updateDto: DeepPartial<T>): Promise<T> {
    return this.repository.save(updateDto);
  }

  filters(filter: FilterQueryDto, entityType: string) {
    const entity = this.filterData
      .initRepositry(entityType, this.repository, filter)
      .filter()
      .sort()
      .paginate()
      .joinRelations("created_by", ["email"])
      .search();
    return entity;
  }

  filtersFront(filter: FilterQueryDto, entityType: string) {
    const entity = this.filterData.initRepositry(entityType, this.repository, filter).paginate();
    return entity;
  }

  async delete(id: number, modulePath: string) {
    const record = await this.repository.findOne({ where: { id } as FindOptionsWhere<T> });

    if (!record) {
      throw new NotFoundException(`Record with id ${id} not found`);
    }

    if (record.featuredImage) {
      try {
        const filePath = join(
          process.cwd(),
          "public",
          "uploads",
          modulePath,
          record.featuredImage.split("/").pop(),
        );

        await unlink(filePath, err => {
          if (err) throw err;
          console.log("/path/file.txt was deleted");
        });
      } catch (err) {
        console.error(`Error deleting file: ${err.message}`);
      }
    }
    await this.repository.delete(id);
    return { data: null };
  }
}
