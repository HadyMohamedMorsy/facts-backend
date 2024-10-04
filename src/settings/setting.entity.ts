import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Settings extends Base {
  @Column({ length: 256, nullable: true })
  section_name: string;

  @Column({ length: 256, nullable: true })
  title_en: string;

  @Column({ length: 256, nullable: true })
  title_ar: string;

  @Column({ length: 512, unique: true })
  slug: string;

  @Column({ length: 1024, nullable: true })
  description_en: string;

  @Column({ length: 1024, nullable: true })
  description_ar: string;

  @Column({ length: 1024, nullable: true })
  short_description_en: string;

  @Column({ length: 1024, nullable: true })
  short_description_ar: string;

  @Column({ length: 1024, nullable: true })
  icon: string;

  @Column({ length: 1024, nullable: true })
  featuredImage: string;
}
