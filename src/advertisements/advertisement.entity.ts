import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Advertisement extends Base {
  @Column({ length: 256 })
  company_name_en: string;

  @Column({ length: 256 })
  company_name_ar: string;

  @Column({ type: "text" })
  featuredImage: string;
}
