import { Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Brackets, Repository, SelectQueryBuilder } from "typeorm";
import { FilterQueryDto } from "../dtos/filter.dto";

@Injectable()
export class FilterDataProvider<T> {
  #queryBuilder: SelectQueryBuilder<T>;
  #entity: string;
  #repository: Repository<T>;
  #filterData: FilterQueryDto;
  #totalRecords!: Promise<number>;

  constructor(@Inject(REQUEST) private readonly request: Request) {}

  initRepositry(entity: string, repository: Repository<T>, filterData: FilterQueryDto) {
    this.#repository = repository;
    this.#filterData = filterData;
    this.#queryBuilder = this.#repository.createQueryBuilder((this.#entity = entity));
    return this;
  }

  filter() {
    if (!this.#filterData.columns || !this.#filterData.columns.length) {
      throw new Error("Columns for selection are required.");
    }

    const fields = this.#filterData.columns.map(field => `${this.#entity}.${field.name}`);
    this.#queryBuilder.select(fields);

    return this;
  }

  provideFields(providers: string[]) {
    if (providers.length) {
      const fields = providers.map(field => `${this.#entity}.${field}`);
      this.#queryBuilder.addSelect(fields);
    }
    return this;
  }

  sort() {
    if (this.#filterData.order && this.#filterData.order.length) {
      this.#filterData.order.forEach(({ column, dir }) => {
        const columnName = this.#filterData.columns[column]?.name;
        if (columnName) {
          this.#queryBuilder.addOrderBy(`${this.#entity}.${columnName}`, dir);
        }
      });
    } else {
      this.#queryBuilder.addOrderBy(`${this.#entity}.createdAt`, "DESC");
    }
    return this;
  }

  count() {
    this.#totalRecords = this.#repository.count();
    return this.#totalRecords;
  }

  paginate() {
    const { start, length } = this.#filterData;
    this.#queryBuilder.skip(start).take(length);
    return this;
  }

  search() {
    const { search, columns } = this.#filterData;
    if (search && columns.some(c => c.searchable)) {
      this.#queryBuilder.andWhere(
        new Brackets(qb => {
          columns
            .filter(c => c.searchable)
            .forEach(column => {
              qb.orWhere(`${this.#entity}.${column.name} LIKE :search`, {
                search: `%${search}%`,
              });
            });
        }),
      );
    }
    return this;
  }

  joinRelations(relations: string[]) {
    if (relations.length) {
      relations.forEach(relation => {
        this.#queryBuilder.leftJoinAndSelect(`${this.#entity}.${relation}`, relation);
      });
    }
    return this;
  }

  async execute(): Promise<T[]> {
    return this.#queryBuilder.getMany();
  }
}
