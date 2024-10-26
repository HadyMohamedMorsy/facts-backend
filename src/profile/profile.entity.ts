import { Gender } from "src/users/enum/enum";
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
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "created_by" })
  created_by: User;

  @Column({ type: "varchar", length: 256 })
  first_name: string;

  @Column({ type: "varchar", length: 256 })
  last_name: string;

  @Column({ type: "varchar", length: 3 })
  age: string;

  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.MALE,
  })
  gender: Gender;

  @Column({ nullable: true })
  country?: string;

  @Column({ type: "varchar", length: 12 })
  phone_number: string;

  @Column({ type: "varchar", length: 12 })
  experience: string;

  @Column("simple-array")
  skills: string[];

  @Column({ nullable: true })
  facebook?: string;

  @Column({ nullable: true })
  achievements?: string;

  @Column({ nullable: true })
  attachment?: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
