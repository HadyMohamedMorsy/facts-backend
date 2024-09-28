import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { unlink } from "fs";
import { join } from "path";
import { IBaseService } from "src/shared/common/base/service.types";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { LanguageService } from "../../../languages/providers/language.service";
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
    private readonly languageService: LanguageService,
  ) {}

  abstract findAll(filter: FilterQueryDto): Promise<any>;

  async findOneRel(id: number, relations: string[] = []): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
      relations,
    });

    if (!entity) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }

    return entity;
  }

  async findOne(id: number): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
    });

    if (!entity) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }

    return entity;
  }

  async create(createDto: CreateDto): Promise<T> {
    const { created_by, language_id } = createDto as any;

    let createdBy = undefined;
    let language = undefined;

    try {
      createdBy = await this.usersService.findOneById(created_by);
      language = await this.languageService.findOneById(language_id);
    } catch (error) {
      throw new ConflictException(error);
    }

    const entity = this.repository.create({
      ...createDto,
      language,
      createdBy,
    } as DeepPartial<T>);
    return this.repository.save(entity);
  }

  async update(id: number, entity: T, updateDto: DeepPartial<T>): Promise<T> {
    const updatedEntity = this.repository.merge(entity, updateDto);
    return this.repository.save(updatedEntity);
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
