import { Role } from "src/roles/role.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
    type: "varchar",
    length: 96,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: "enum",
    enum: Gender,
  })
  gender: Gender;

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

  @OneToOne(() => Role)
  @JoinColumn({ name: "role_id" })
  role: Role;
}
