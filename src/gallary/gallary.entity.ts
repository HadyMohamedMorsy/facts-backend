import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Tab } from "src/tab/tab.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("gallary")
export class Gallary extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "created_by" })
  createdBy: User;

  @ManyToOne(() => Tab, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tab_id" })
  tab: Tab;

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive: boolean;

  @Column({ name: "order", type: "int", nullable: true, unique: true })
  orderIndex: number;

  @Column({ name: "content", type: "json", nullable: true })
  content: Array<{
    accordion_title?: string;
    language_id: number;
  }>;

  @Column("text", { array: true })
  files: string[];
}
