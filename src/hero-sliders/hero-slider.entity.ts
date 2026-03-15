import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("hero_slider")
export class HeroSlider extends BaseMemberEntity {
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
    title?: string;
    short_description?: string;
    language_id: number;
  }>;

  @Column({ type: "text", nullable: true })
  featuredImage: string;

  @Column({ type: "text", nullable: true })
  video: string;

  @Column({ type: "varchar", length: 20, default: "image" })
  type: "image" | "video";
}
