import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { ROLES } from "src/shared/enum/global-enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Role extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: ROLES })
  name: ROLES;
}
