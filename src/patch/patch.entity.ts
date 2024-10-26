import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class PatchGraduates extends Base {
  @Column({ type: "varchar", length: 256 })
  name_en: string;

  @Column({ type: "varchar", length: 256 })
  name_ar: string;

  @Column({ type: "varchar", length: 5 })
  year: string;

  @Column({ type: "text", nullable: true })
  description_en: string;

  @Column({ type: "text", nullable: true })
  description_ar: string;

  @Column("text", { array: true })
  files: string[];
}
