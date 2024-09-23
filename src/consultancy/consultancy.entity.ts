import { Base } from "src/shared/common/base/base.entity";
import { Column, Entity, OneToMany, Unique } from "typeorm";
import { ConsultancyAccordion } from "./consultancy-accordion.entity";

@Entity()
@Unique(["order", "language"])
export class Consultancy extends Base {
  @Column({ length: 256 })
  title: string;

  @Column({ length: 512 })
  slug: string;

  @Column({ type: "varchar", length: 1024, nullable: true })
  featuredImage: string;

  @Column({ type: "text", nullable: true })
  short_description?: string;

  @OneToMany(() => ConsultancyAccordion, consultancyAccordion => consultancyAccordion.consultancy)
  consultancyAccordion: ConsultancyAccordion[];
}
