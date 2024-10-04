import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ROLES } from "./enum/enum";
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: ROLES })
  name: ROLES;
}
