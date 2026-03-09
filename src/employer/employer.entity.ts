import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employer extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "created_by" })
  createdBy: User;

  @Column({ name: "company_name", type: "text" })
  companyName: string;

  @Column({ name: "business_type", type: "text" })
  businessType: string;

  @Column({ type: "text" })
  industry: string;

  @Column({ name: "is_active", type: "boolean", default: false })
  isActive: boolean;

  @Column({ name: "company_address", type: "text" })
  companyAddress: string;

  @Column({ name: "company_phone", type: "text" })
  companyPhone: string;

  @Column({ name: "company_email", type: "text" })
  companyEmail: string;

  @Column({ name: "website_url", type: "text", nullable: true })
  websiteUrl?: string;
}
