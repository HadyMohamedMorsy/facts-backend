import { Graduates } from "src/graduates/graduates.entity";
import { Role } from "src/roles/role.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Gender } from "src/shared/enum/global-enum";
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

@Entity()
export class User extends BaseMemberEntity {
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
