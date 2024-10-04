import { User } from "src/users/user.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
export abstract class Base extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "boolean",
    default: true,
  })
  is_active: boolean;

  @Column({
    unique: true,
    type: "int",
    nullable: true,
  })
  order: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "created_by" })
  createdBy: User;
}
