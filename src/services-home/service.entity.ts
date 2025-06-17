import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Service extends BaseMemberEntity {
  @Column({ length: 256 })
  name_en: string;

  @Column({ length: 256 })
  name_ar: string;

  @Column({ length: 256, nullable: true })
  link?: string;

  @Column({ type: "text" })
  featuredImage?: string;
}
