import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Advertisement extends BaseMemberEntity {
  @Column({ name: "content", type: "json", nullable: true })
  content: Array<{
    company_name: string;
    language_id: number;
  }>;

  @Column({ length: 256 })
  page: string;

  @Column({ type: "text" })
  featuredImage: string;
}
