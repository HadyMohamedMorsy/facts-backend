import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Advertisement extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "content", type: "json", nullable: true })
  content: Array<{
    company_name: string;
    language_id: number;
  }>;

  @Column({ length: 256 })
  page: string;

  @Column({ type: "varchar", length: 1024, nullable: true })
  link?: string;

  @Column({ type: "text" })
  featuredImage: string;
}
