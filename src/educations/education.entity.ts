import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { EducationAccordion } from "./education-accordion.entity";
import { EducationDetails } from "./education-details.entity";

@Entity()
export class Education extends Base {
  @Column({ length: 256 })
  title_en: string;

  @Column({ length: 256 })
  title_ar: string;

  @Column({
    type: "varchar",
    length: 256,
    unique: true,
  })
  slug: string;

  @Column({ type: "text" })
  intro_description_ar?: string;

  @Column({ type: "text" })
  intro_description_en?: string;

  @Column({ type: "text" })
  short_description_en?: string;

  @Column({ type: "text" })
  short_description_ar?: string;

  @Column({ type: "text" })
  featuredImage: string;

  @Column({ type: "text" })
  thumbnail: string;

  @OneToMany(() => EducationAccordion, education => education.education, {
    cascade: true,
    eager: true,
  })
  education_accordion?: EducationAccordion[];

  @OneToMany(() => EducationDetails, education => education.education, {
    cascade: true,
    eager: true,
  })
  education_details?: EducationDetails[];
}
