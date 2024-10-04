import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Banner extends Base {
  @Column({ length: 256 })
  title_en: string;

  @Column({ length: 256 })
  title_ar: string;

  @Column({ length: 256, unique: true })
  page: string;

  @Column({ type: "text", nullable: true })
  short_description_en?: string;

  @Column({ type: "text", nullable: true })
  short_description_ar?: string;

  @Column({ type: "text" })
  featuredImage?: string;
}
