import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Gallary extends Base {
  @Column({ type: "varchar", length: 256 })
  accordion_title_en: string;

  @Column({ type: "varchar", length: 256 })
  accordion_title_ar: string;

  @Column("text", { array: true })
  files: string[];
}
