import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("patch_graduates")
export class PatchGraduates extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "created_by" })
  createdBy: User;

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive: boolean;

  @Column({ name: "order", type: "int", nullable: true })
  orderIndex: number;

  @Column({ name: "content", type: "json", nullable: true })
  content: Array<{
    name?: string;
    description?: string;
    language_id: number;
  }>;

  @Column({ length: 5 })
  year: string;

  @Column("text", { array: true })
  files: string[];
}
