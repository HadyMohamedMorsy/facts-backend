import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ConsultancyAccordion } from "./consultancy-accordion.entity";

@Entity()
export class Consultancy extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "content", type: "json", nullable: true })
  content: Array<{
    title: string;
    short_description?: string;
    language_id: number;
  }>;

  @Column({ length: 512, unique: true })
  slug: string;

  @Column({ type: "text" })
  featuredImage: string;

  @OneToMany(() => ConsultancyAccordion, accordion => accordion.consultancy, {
    cascade: true,
  })
  consultancy_accordion: ConsultancyAccordion[];
}
