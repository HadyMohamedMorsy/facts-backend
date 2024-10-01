import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Job extends Base {
  @Column({ length: 256 })
  title: string;

  @Column({ length: 512 })
  slug: string;

  @Column()
  short_description: string;

  @Column()
  description: string;

  @Column({ length: 1024 })
  featuredImage: string;

  @Column("simple-array") // Storing the skills as a simple comma-separated list
  skills: string[];
}
