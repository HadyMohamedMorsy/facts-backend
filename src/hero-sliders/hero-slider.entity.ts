import { Base } from "src/shared/common/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class HeroSlider extends Base {
  @Column({ length: 256 })
  title: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ length: 1024, nullable: true })
  featuredImage?: string;
}
