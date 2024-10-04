import { BaseTime } from "src/shared/common/base/entity/base-time.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Consultancy } from "./consultancy.entity";

@Entity()
export class ConsultancyAccordion extends BaseTime {
  @Column({
    type: "varchar",
    length: 256,
  })
  accordion_title_en: string;

  @Column({
    type: "varchar",
    length: 256,
  })
  accordion_title_ar: string;

  @Column({
    type: "varchar",
    length: 256,
  })
  description_en: string;

  @Column({
    type: "varchar",
    length: 256,
  })
  description_ar: string;

  @ManyToOne(() => Consultancy, consultancy => consultancy.consultancy_accordion, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  consultancy: Consultancy;
}
