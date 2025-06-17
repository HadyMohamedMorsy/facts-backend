/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ROLES } from "src/shared/enum/global-enum";

export class RoleDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(256)
  name: ROLES;
}

export class PatchRoleDto extends RoleDto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
