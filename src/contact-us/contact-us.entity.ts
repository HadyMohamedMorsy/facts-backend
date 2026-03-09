import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contact extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ name: "full_name", length: 512 })
  fullName: string;

  @Column({ length: 256 })
  subject: string;

  @Column({ name: "phone_number", type: "varchar", unique: true })
  phoneNumber: string;

  @Column({ type: "text", nullable: true })
  message?: string;
}
