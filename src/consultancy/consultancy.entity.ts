import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { ConsultancyAccordion } from "./consultancy-accordion.entity";

@Entity()
export class Consultancy extends Base {
  @Column({ length: 256 })
  title_en: string;

  @Column({ length: 256 })
  title_ar: string;

  @Column({ length: 512 })
  slug: string;

  @Column({ type: "text" })
  featuredImage: string;

  @Column({ type: "text" })
  short_description_en?: string;

  @Column({ type: "text" })
  short_description_ar?: string;

  @OneToMany(() => ConsultancyAccordion, consultancyAccordion => consultancyAccordion.consultancy)
  consultancy_accordion: ConsultancyAccordion[];
}
