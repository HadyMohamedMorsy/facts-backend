import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Partner extends Base {
  @Column({
    type: "varchar",
    length: 256,
  })
  title_en: string;

  @Column({
    type: "varchar",
    length: 256,
  })
  title_ar: string;

  @Column({
    type: "varchar",
    length: 256,
  })
  link: string;

  @Column({
    type: "text",
  })
  description_en: string;

  @Column({
    type: "text",
  })
  description_ar: string;

  @Column({
    type: "text",
  })
  featuredImage: string;
}
