import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Team extends BaseMemberEntity {
  @Column({ type: "varchar", length: 256 })
  name_en: string;

  @Column({ type: "varchar", length: 256 })
  name_ar: string;

  @Column("text", { array: true })
  phone_number: string[];

  @Column("text")
  description_en: string;

  @Column("text")
  description_ar: string;

  @Column({ type: "text", nullable: true })
  position_en: string;

  @Column({ type: "text", nullable: true })
  position_ar: string;

  @Column("jsonb", { default: [] })
  social_links: { icon: string; link: string }[];

  @Column({ type: "varchar", length: 1024 })
  featuredImage: string;
}
