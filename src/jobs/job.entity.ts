import { User } from "src/users/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { TYPE } from "./enum/enum";

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  title_en: string;

  @Column({ length: 256 })
  title_ar: string;

  @Column({ type: "text", nullable: true })
  short_description_en: string;

  @Column({ type: "text", nullable: true })
  short_description_ar: string;

  @Column({ type: "enum", enum: TYPE })
  type: TYPE;

  @Column({ type: "numeric" })
  sallary: number;

  @Column({ type: "text" })
  description_en: string;

  @Column({ type: "text" })
  description_ar: string;

  @Column({ type: "text" })
  featuredImage: string;

  @Column({
    type: "boolean",
    default: true,
  })
  is_active: boolean;

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
  created_by: User;
}
