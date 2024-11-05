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
  #selectMap = new Map();

  constructor(@Inject(REQUEST) private readonly request: Request) {}

  initRepositry(entity: string, repository: Repository<T>, filterData: FilterQueryDto) {
    this.#repository = repository;
    this.#filterData = filterData;
    this.#queryBuilder = this.#repository.createQueryBuilder((this.#entity = entity));
    return this;
  }

  getRelatedFieldsLang(fieldName) {
    const suffix = fieldName.endsWith("_en") ? "_ar" : "_en";
    return `${fieldName.slice(0, -3)}${suffix}`;
  }

  filter() {
    if (!this.#filterData.columns || !this.#filterData.columns.length) {
      throw new Error("Columns for selection are required.");
    }

    const fields = this.#filterData.columns.flatMap(column => {
      const mainEntityName = column.name.includes(".") ? column.name.split(".")[0] : column.name;
      const fieldName = `${this.#entity}.${mainEntityName}`;
      if (mainEntityName.endsWith("_en") || mainEntityName.endsWith("_ar")) {
        const relatedFieldName = `${this.#entity}.${this.getRelatedFieldsLang(mainEntityName)}`;
        return [fieldName, relatedFieldName];
      }
      return [fieldName];
    });

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

  searchFrontOnly(searchString: string, fields: string[]) {
    if (searchString && fields.length > 0) {
      this.#queryBuilder.andWhere(
        new Brackets(qb => {
          fields.forEach(field => {
            qb.orWhere(`${this.#entity}.${field} LIKE :searchString`, {
              searchString: `%${searchString}%`,
            });
          });
        }),
      );
    }

    return this;
  }

  sort() {
    if (this.#filterData.order && this.#filterData.order.length) {
      this.#filterData.order.forEach(({ column, dir }) => {
        const columnName = this.#filterData.columns.filter(coulmn => !coulmn.name.includes("."))[
          column
        ]?.name;
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
            .filter(c => c.searchable && !c.name.includes("."))
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

  excludeFields(entity, fields) {
    this.#selectMap.set(entity, fields);
    return this;
  }

  joinRelations(relation: string, fields?: string[]) {
    if (relation) {
      const relationAlias = `${this.#entity}_${relation}`;
      this.#queryBuilder.leftJoin(`${this.#entity}.${relation}`, relationAlias);

      fields.forEach(field => {
        this.#queryBuilder.addSelect(`${relationAlias}.${field}`);
      });
    }
    return this;
  }

  searchFrontRelation(searchRel: { [fieldPath: string]: string }) {
    Object.entries(searchRel).forEach(([fieldPath, searchValue]) => {
      if (searchValue) {
        const [relationAlias, field] = fieldPath.includes(".")
          ? [
              `${this.#entity}_${fieldPath.split(".")[0].replace(".", "_")}`,
              fieldPath.split(".")[1],
            ]
          : [this.#entity, fieldPath];

        this.#queryBuilder.andWhere(`${relationAlias}.${field} LIKE :search`, {
          search: `%${searchValue}%`,
        });
      }
    });

    return this;
  }

  searchRelations() {
    const { search, columns } = this.#filterData;
    if (search && columns.some(c => c.searchable && c.name.includes("."))) {
      this.#queryBuilder.andWhere(
        new Brackets(qb => {
          columns
            .filter(c => c.searchable && c.name.includes("."))
            .forEach(column => {
              const [relationName, fieldName] = column.name.split(".");
              const relationAlias = `${this.#entity}_${relationName}`;

              qb.orWhere(`${relationAlias}.${fieldName} LIKE :search`, {
                search: `%${search}%`,
              });
            });
        }),
      );
    }
    return this;
  }

  dynamicFilter(filters: { [key: string]: any }) {
    Object.keys(filters).forEach(key => {
      const value = filters[key].value;
      if (!value) return this;
      if (filters[key].type === "where") {
        this.#queryBuilder.andWhere(`${this.#entity}.${key} = :value`, { value });
      } else if (filters[key].type === "search") {
        this.#queryBuilder.andWhere(`${key} LIKE :searchTerm`, { searchTerm: value });
      }
    });
    return this;
  }

  joinInnerRelations(relation: string, fields?: string[]) {
    if (relation) {
      const relationAlias = `${this.#entity}_${relation}`;
      this.#queryBuilder.innerJoin(`${this.#entity}.${relation}`, relationAlias);

      fields?.forEach(field => {
        this.#queryBuilder.addSelect(`${relationAlias}.${field}`);
      });
    }
    return this;
  }

  filterByActive() {
    this.#queryBuilder.andWhere(`${this.#entity}.is_active = :isActive`, { isActive: true });
    return this;
  }

  orderByOrder(direction: "ASC" | "DESC" = "ASC") {
    this.#queryBuilder.addOrderBy(`${this.#entity}.order`, direction);
    return this;
  }

  joinRelatedEntitiesById(
    relationName: string,
    relationEntityField: string,
    id: any,
    fields?: string[],
  ) {
    if (!id) return this;

    const uniqueAlias = `${relationName}_${id}`;
    this.#queryBuilder.innerJoinAndSelect(
      `${this.#entity}.${relationName}`,
      uniqueAlias,
      `${uniqueAlias}.${relationEntityField} = :id`,
      { id },
    );

    if (fields) {
      fields.forEach(field => {
        this.#queryBuilder.addSelect(`${uniqueAlias}.${field}`);
      });
    }

    return this;
  }

  async execute(): Promise<T[]> {
    return this.#queryBuilder.getMany();
  }
}
