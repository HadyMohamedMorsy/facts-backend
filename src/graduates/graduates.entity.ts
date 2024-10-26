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
import { createUserGraduatesDto } from "./dtos/create-graduates-users.dto";

@Entity()
export class Graduates {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "boolean",
    default: true,
  })
  is_active: boolean;

  @Column("json", { nullable: true })
  selectUser: createUserGraduatesDto;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user" })
  user: User;

  @Column({ length: 256 })
  type: string;

  @Column({ length: 512, unique: true })
  slug: string;

  @Column({ type: "varchar" })
  description_en: string;

  @Column({ type: "varchar" })
  description_ar: string;

  @Column("simple-array")
  courses: string[];

  @Column({ type: "varchar" })
  featuredImage: string;

  @Column({ type: "varchar" })
  attachment: string;

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
