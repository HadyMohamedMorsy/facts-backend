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
export class Employer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  company_name: string;

  @Column({ type: "text" })
  business_type: string;

  @Column({ type: "text" })
  industry: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "created_by" })
  createdBy: User;

  @Column({
    type: "boolean",
    default: false,
  })
  is_active: boolean;

  @Column({ type: "text" })
  company_address: string;

  @Column({ type: "text" })
  company_phone: string;

  @Column({ type: "text" })
  company_email: string;

  @Column({ type: "text", nullable: true })
  website_url: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
