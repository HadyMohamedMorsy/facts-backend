import { Category } from "src/categories/category.entity";
import { Base } from "src/shared/common/base/base.entity";
import { Column, Entity, JoinTable, ManyToMany, Unique } from "typeorm";

@Entity()
@Unique(["order", "language"])
export class Magazine extends Base {
  @Column({ length: 256 })
  title: string;

  @Column({ length: 512 })
  slug: string;

  @Column({ length: 1024, nullable: true })
  short_description: string;

  @Column({ length: 1024 })
  description: string;

  @Column({ length: 1024, nullable: true })
  featuredImage: string;

  @ManyToMany(() => Category, category => category.magazines)
  @JoinTable()
  categories: Category[];
}
