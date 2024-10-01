import { Language } from "src/languages/language.entity";
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

@Entity()
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "boolean",
    default: true,
  })
  is_active: boolean;
  @Column({ length: 256 })
  title: string;

  @Column({ length: 256, unique: true })
  page: string;

  @Column({ type: "text", nullable: true })
  short_description?: string;

  @Column({ length: 1024, nullable: true })
  featuredImage?: string;

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

  @ManyToOne(() => Language)
  @JoinColumn({ name: "language_id" })
  language: Language;
}
