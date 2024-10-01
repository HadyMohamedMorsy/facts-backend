import { Magazine } from "src/magazines/magazine.entity";
import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity, ManyToMany } from "typeorm";

@Entity()
export class CategoryBlog extends Base {
  @Column({ length: 255 })
  name: string;

  @Column({ length: 512, nullable: false })
  slug: string;

  @ManyToMany(() => Magazine, magazine => magazine.categories)
  magazines: Magazine[];
}
