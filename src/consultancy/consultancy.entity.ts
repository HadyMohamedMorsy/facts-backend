import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity, OneToMany, Unique } from "typeorm";
import { ConsultancyAccordion } from "./consultancy-accordion.entity";

@Entity()
@Unique(["order", "language"])
export class Consultancy extends Base {
  @Column({ length: 256, nullable: false })
  title: string;

  @Column({ length: 512, nullable: false })
  slug: string;

  @Column({ type: "varchar", length: 1024, nullable: false })
  featuredImage: string;

  @Column({ type: "text", nullable: true })
  short_description?: string;

  @OneToMany(() => ConsultancyAccordion, consultancyAccordion => consultancyAccordion.consultancy)
  consultancy_accordion: ConsultancyAccordion[];
}
