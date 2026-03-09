import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TeamSocial } from "./team-social.entity";

@Entity("team")
export class Team extends BaseMemberEntity {
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
    name?: string;
    description?: string;
    position?: string;
    language_id: number;
  }>;

  @Column({ name: "phone_number", type: "text", array: true })
  phoneNumber: string[];

  @Column({ type: "varchar", length: 1024 })
  featuredImage: string;

  @OneToMany(() => TeamSocial, social => social.team, {
    cascade: true,
    onDelete: "CASCADE",
  })
  socialLinks: TeamSocial[];
}
