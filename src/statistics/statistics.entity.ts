import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Statistics extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "created_by" })
  createdBy: User;

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive: boolean;

  @Column({ name: "order", type: "int", nullable: true, unique: true })
  orderIndex: number;

  @Column({ name: "content", type: "json", nullable: true })
  content: Array<{
    title?: string;
    language_id: number;
  }>;

  @Column({ type: "int" })
  value: number;

  @Column({ type: "varchar", length: 1024 })
  icon: string;
}
