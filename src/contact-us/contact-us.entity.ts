import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
    unique: true,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 512,
  })
  full_name: string;

  @Column({
    type: "varchar",
    length: 256,
  })
  subject: string;

  @Column({
    type: "varchar",
    unique: true,
  })
  phone_number: string;

  @Column({
    type: "text",
  })
  message: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
}
