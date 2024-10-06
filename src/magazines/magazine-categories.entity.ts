import { BaseTime } from "src/shared/common/base/entity/base-time.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Magazine } from "./magazine.entity";

@Entity()
export class MagazineCategories extends BaseTime {
  @Column({
    type: "varchar",
    length: 256,
  })
  label: string;

  @Column({
    type: "numeric",
  })
  value: number;

  @ManyToOne(() => Magazine, magazine => magazine.categories_objects, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  categories: Magazine;
}
