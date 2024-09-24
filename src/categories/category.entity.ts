import { Magazine } from "src/magazines/magazine.entity";
import { Base } from "src/shared/common/base/base.entity";
import { Column, Entity, ManyToMany } from "typeorm";

@Entity()
export class Category extends Base {
  @Column({ length: 255 })
  name: string;

  @ManyToMany(() => Magazine, magazine => magazine.categories)
  magazines: Magazine[];
}
