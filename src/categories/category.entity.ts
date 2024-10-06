import { Magazine } from "src/magazines/magazine.entity";
import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity, ManyToMany } from "typeorm";

@Entity()
export class Category extends Base {
  @Column({ length: 255 })
  name_en: string;

  @Column({ length: 255 })
  name_ar: string;

  @Column({ length: 512, unique: true })
  slug: string;

  @ManyToMany(() => Magazine, magazine => magazine.categories, {
    onDelete: "CASCADE",
  })
  magazines: Magazine[];
}
