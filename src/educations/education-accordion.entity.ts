import { BaseTime } from "src/shared/common/base/entity/base-time.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Education } from "./education.entity";

@Entity()
export class EducationAccordion extends BaseTime {
  @Column({
    type: "varchar",
    length: 512,
    nullable: false,
  })
  accordion_title: string;

  @Column({
    type: "varchar",
    length: 512,
    nullable: false,
  })
  description: string;

  @ManyToOne(() => Education, education => education.education_accordion, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  education: Education;
}
