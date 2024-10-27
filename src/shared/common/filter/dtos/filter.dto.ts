import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";

export class OrderDto {
  @IsInt()
  @Type(() => Number)
  column: number;

  @IsString()
  dir: "ASC" | "DESC";
}

export class DataTableColumnDto {
  @IsString()
  title: string;

  @IsString()
  name: string;

  @IsBoolean()
  searchable: boolean;

  @IsBoolean()
  orderable: boolean;
}

export class FilterOptions {
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsString()
  publication_date?: number;

  @IsOptional()
  @IsString()
  slug?: string;
}

export class FilterQueryDto {
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  length?: number = 10;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  start?: number = 0;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  order?: OrderDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DataTableColumnDto)
  columns?: DataTableColumnDto[];

  @IsOptional()
  @IsArray()
  provideFields?: string[];

  @IsOptional()
  search?: string | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => FilterOptions)
  filters?: FilterOptions;

  [key: string]: any;
}
