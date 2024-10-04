import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity } from "typeorm";
import { TYPE } from "./enum/enum";

@Entity()
export class Job extends Base {
  @Column({ length: 256 })
  title_en: string;

  @Column({ length: 256 })
  title_ar: string;

  @Column({ length: 512, unique: true })
  slug: string;

  @Column({ type: "text", nullable: true })
  short_description_en: string;

  @Column({ type: "text", nullable: true })
  short_description_ar: string;

  @Column({ type: "enum", enum: TYPE })
  type: TYPE;

  @Column({ type: "inet" })
  sallary: number;

  @Column({ type: "text" })
  description_en: string;

  @Column({ type: "text" })
  description_ar: string;

  @Column({ type: "text" })
  featuredImage: string;
}
