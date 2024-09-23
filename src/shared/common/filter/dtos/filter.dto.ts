import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from "class-validator";

export class SearchDto {
  @IsOptional()
  @IsString()
  value: string | null;

  @IsBoolean()
  regex: boolean;
}

export class OrderDto {
  @IsInt()
  column: number;

  @IsString()
  dir: "ASC" | "DESC";
}

export class DataTableColumnDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsBoolean()
  searchable: boolean;

  @IsBoolean()
  orderable: boolean;
}

export class FilterQueryDto {
  @IsOptional()
  @IsPositive()
  length?: number = 10;

  @IsOptional()
  @IsPositive()
  start?: number = 1;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  order?: OrderDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DataTableColumnDto)
  columns: DataTableColumnDto[];

  @IsOptional()
  @IsArray()
  provideFields: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => SearchDto)
  search?: SearchDto;
}
