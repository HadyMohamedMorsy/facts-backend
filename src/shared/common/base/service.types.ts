import { FilterQueryDto } from "../filter/dtos/filter.dto";
import { FilterDataProvider } from "../filter/providers/filter-data.provider";

export interface IBaseService<CreateDto> {
  findAll(filterQueryDto: FilterQueryDto, entityType?: string): any;
  front(filterQueryDto: FilterQueryDto, entityType?: string): any;
  create(createDto: CreateDto, relation: string[]): any;
  findOne(id: number, relation: string[]): any;
  update(update: any, relation: string[]): any;
  delete(id: number, modulePath: string): void;
  filters(filter: FilterQueryDto, entityType: string): FilterDataProvider<any>;
}
