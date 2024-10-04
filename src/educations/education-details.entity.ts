import { BaseTime } from "src/shared/common/base/entity/base-time.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Education } from "./education.entity";

@Entity()
export class EducationDetails extends BaseTime {
  @Column("text")
  name_en: string;

  @Column("text")
  name_ar: string;

  @Column("text")
  value_en: string;

  @Column("text")
  value_ar: string;

  @ManyToOne(() => Education, education => education.education_accordion, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  education: Education;
}
