import { Magazine } from "src/magazines/magazine.entity";
import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Blog extends Base {
  @Column({ length: 256 })
  title_en: string;

  @Column({ length: 256 })
  title_ar: string;

  @Column({ length: 256, unique: true })
  slug: string;

  @Column({ length: 256, nullable: true })
  meta_title_en: string;

  @Column({ length: 256, nullable: true })
  meta_title_ar: string;

  @Column({ type: "text", nullable: true })
  meta_description_en: string;

  @Column({ type: "text", nullable: true })
  meta_description_ar: string;

  @Column({ type: "text", nullable: true })
  short_description_en: string;

  @Column({ type: "text", nullable: true })
  short_description_ar: string;

  @Column({ type: "text" })
  description_en: string;

  @Column({ type: "text" })
  description_ar: string;

  @Column({ type: "text" })
  featuredImage: string;

  @Column({ type: "text" })
  thumbnail: string;

  @ManyToOne(() => Magazine)
  @JoinColumn({ name: "magazine_id" })
  magazine: Magazine;
}
