import { Category } from "src/categories/category.entity";
import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

@Entity()
export class Magazine extends Base {
  @Column({ length: 256 })
  title_ar: string;

  @Column({ length: 256 })
  title_en: string;

  @Column({ length: 512, unique: true })
  slug: string;

  @Column({ length: 1024 })
  short_description_ar: string;

  @Column({ length: 1024 })
  short_description_en: string;

  @Column({ type: "text" })
  featuredImage: string;

  @Column()
  publicationDate?: string;

  @ManyToMany(() => Category, category => category.magazines)
  @JoinTable({ name: "category_ids" })
  categories: Category[];
}
