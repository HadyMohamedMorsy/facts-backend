import { Graduates } from "src/graduates/graduates.entity";
import { Role } from "src/roles/role.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Gender } from "./enum/enum";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 96,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: "varchar",
    length: 96,
    nullable: true,
  })
  lastName: string;

  @Column({
    type: "varchar",
    length: 96,
    nullable: true,
  })
  username: string;

  @Column({
    nullable: true,
  })
  phone_number: string;

  @Column({
    type: "varchar",
    length: 96,
    nullable: true,
  })
  country: string;

  @Column({
    type: "varchar",
    length: 96,
    nullable: false,
  })
  email: string;

  @Column({
    type: "enum",
    enum: Gender,
  })
  gender: Gender;

  @Column({ type: "text", nullable: true })
  address?: string;

  @Column({
    type: "varchar",
    length: 96,
    nullable: true,
  })
  password?: string;

  @Column({
    type: "boolean",
    default: true,
  })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Role)
  @JoinColumn({ name: "role_id" })
  role: Role;

  @OneToOne(() => Graduates, graduate => graduate.user)
  graduate: Graduates;
}
