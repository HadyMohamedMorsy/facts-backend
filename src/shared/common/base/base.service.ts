import { Injectable, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { IBaseService } from "src/shared/common/base/service.types";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { deleteFile } from "src/shared/helpers/utilits";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { UserService } from "../../../users/providers/user.service";

interface BaseEntity {
  id: number;
  featuredImage?: string;
  files?: string[];
  thumbnail?: string;
  attachment?: string;
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

  async create(createDto: CreateDto, relations: string[]): Promise<T> {
    const entity = this.repository.create(createDto as DeepPartial<T>);
    await this.repository.save(entity);

    const result = await this.repository.findOne({
      where: { id: +entity.id } as FindOptionsWhere<T>,
      relations,
    });

    if (!result) {
      throw new NotFoundException(`Entity with ID ${entity.id} not found`);
    }

    return result;
  }

  async update(updateDto: DeepPartial<T>, relations: string[]): Promise<T> {
    const updateEntity = await this.repository.save(updateDto);
    const result = await this.repository.findOne({
      where: { id: updateEntity.id } as FindOptionsWhere<T>,
      relations,
    });
    if (!result) {
      throw new NotFoundException(`Entity with ID ${updateEntity.id} not found`);
    }
    return result;
  }

  filters(filter: FilterQueryDto, entityType: string) {
    const entity = this.filterData
      .initRepositry(entityType, this.repository, filter)
      .filter()
      .sort()
      .paginate()
      .joinRelations("created_by", ["email"])
      .search()
      .searchRelations();
    return entity;
  }

  filtersFront(filter: FilterQueryDto, entityType: string) {
    const entity = this.filterData
      .initRepositry(entityType, this.repository, filter)
      .paginate()
      .filterByActive();
    return entity;
  }

  async delete(id: number, request: Request) {
    const record = await this.repository.findOne({ where: { id } as FindOptionsWhere<T> });

    if (!record) {
      throw new NotFoundException(`Record with id ${id} not found`);
    }

    const keysToCheck: Array<keyof BaseEntity> = [
      "featuredImage",
      "files",
      "thumbnail",
      "attachment",
    ];

    try {
      for (const key of keysToCheck) {
        const fileOrFiles = record[key];
        if (fileOrFiles) {
          if (Array.isArray(fileOrFiles)) {
            for (const file of fileOrFiles) {
              deleteFile(file, request);
            }
          } else {
            deleteFile(fileOrFiles as string, request);
          }
        }
      }
    } catch (error) {
      console.error(`Error deleting files: ${error.message}`);
      throw new NotFoundException(`Failed to delete associated files for record with id ${id}`);
    }

    await this.repository.delete(id);
    return { data: null };
  }
}
