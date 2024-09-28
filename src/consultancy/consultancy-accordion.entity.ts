import { BaseTime } from "src/shared/common/base/entity/base-time.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Consultancy } from "./consultancy.entity";

@Entity()
export class ConsultancyAccordion extends BaseTime {
  @Column({
    type: "varchar",
    length: 256,
  })
  accordion_title: string;

  @Column({
    type: "varchar",
    length: 256,
  })
  description: string;

  @ManyToOne(() => Consultancy, consultancy => consultancy.consultancy_accordion, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  consultancy: Consultancy;
}
