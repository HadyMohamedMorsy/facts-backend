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
  accordion_title_en: string;

  @Column({
    type: "varchar",
    length: 512,
    nullable: false,
  })
  accordion_title_ar: string;

  @Column({
    type: "text",
    nullable: false,
  })
  description_en: string;

  @Column({
    type: "text",
    nullable: false,
  })
  description_ar: string;

  @ManyToOne(() => Education, education => education.education_accordion, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  education: Education;
}
