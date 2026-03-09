import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subscribe extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "created_by" })
  createdBy: User;

  @Column({ name: "email_subscribe", type: "text", unique: true })
  emailSubscribe: string;

  @Column({ type: "text" })
  type: string;

  @Column({ name: "is_active", type: "boolean", default: false })
  isActive: boolean;
}
