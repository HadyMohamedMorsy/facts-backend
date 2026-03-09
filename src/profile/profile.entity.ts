import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Gender } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: "SET NULL" })
  createdBy: User;

  @Column({ name: "first_name", type: "varchar", length: 256 })
  firstName: string;

  @Column({ name: "last_name", type: "varchar", length: 256 })
  lastName: string;

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

  @Column({ name: "phone_number", type: "varchar", length: 12 })
  phoneNumber: string;

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
}
