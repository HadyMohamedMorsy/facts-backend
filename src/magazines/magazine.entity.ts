import { Blog } from "src/blogs/blog.entity";
import { Category } from "src/categories/category.entity";
import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { MagazineCategoriesDto } from "./dto/magazine-categories.dto";

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

  @Column({ type: "date", nullable: true })
  publication_date?: string;

  @Column("json", { nullable: true })
  selectedCategories: MagazineCategoriesDto[];

  @ManyToMany(() => Category, category => category.magazines, {
    eager: true,
  })
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Blog, blog => blog.magazine, {
    eager: true,
  })
  @JoinTable()
  blogs: Blog[];
}
