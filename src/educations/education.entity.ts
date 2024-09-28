import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity, OneToMany, Unique } from "typeorm";
import { EducationAccordion } from "./education-accordion.entity";
import { EducationDetails } from "./education-details.entity";

@Entity()
@Unique(["order", "language"])
export class Education extends Base {
  @Column({ length: 256 })
  title: string;

  @Column({
    type: "varchar",
    length: 256,
    unique: true,
  })
  slug: string;

  @Column({ type: "text", nullable: true })
  short_description?: string;

  @Column({ length: 1024, nullable: true })
  featuredImage: string;

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
