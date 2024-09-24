import { Base } from "src/shared/common/base/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ParentSettings } from "./parent-setting.entity";

@Entity()
export class Settings extends Base {
  @Column({ length: 256, nullable: true })
  title: string;

  @Column({ length: 512, unique: true })
  slug: string;

  @Column({ length: 1024, nullable: true })
  description: string;

  @Column({ length: 1024, nullable: true })
  short_description: string;

  @Column({ length: 1024, nullable: true })
  icon: string;

  @Column({ length: 1024, nullable: true })
  featuredImage: string;

  @ManyToOne(() => ParentSettings)
  @JoinColumn({ name: "parent_id" })
  parent: ParentSettings[];
}
