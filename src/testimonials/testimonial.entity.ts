import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("testimonial")
export class Testimonial extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "created_by" })
  createdBy: User;

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive: boolean;

  @Column({ name: "order", type: "int", nullable: true, unique: true })
  orderIndex?: number;

  @Column({ name: "rating", type: "int", default: 5 })
  rating: number;

  @Column({ name: "content", type: "json", nullable: true })
  content: Array<{
    name?: string;
    position?: string;
    quote?: string;
    language_id: number;
  }>;

  @Column({ type: "varchar", length: 1024, nullable: true, default: "" })
  featuredImage: string;
}
