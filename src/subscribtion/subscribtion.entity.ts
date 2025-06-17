import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subscribe extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", unique: true })
  email_subscribe: string;

  @Column({ type: "text" })
  type: string;

  @Column({
    type: "boolean",
    default: false,
  })
  is_active: boolean;
}
