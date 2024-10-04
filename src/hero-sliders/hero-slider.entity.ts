import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class HeroSlider extends Base {
  @Column({ length: 256 })
  title_en: string;

  @Column({ length: 256 })
  title_ar: string;

  @Column({ type: "text" })
  short_description_en?: string;

  @Column({ type: "text" })
  short_description_ar?: string;

  @Column({ type: "text" })
  featuredImage?: string;
}
