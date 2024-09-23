import { Base } from "src/shared/common/base/base.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique(["order", "language"])
export class Team extends Base {
  @Column({ type: "varchar", length: 256 })
  name: string;

  @Column("inet", { array: true }) // Stores data as JSON string
  phone_number: number[];

  @Column("text")
  description: string;

  @Column("simple-array", { nullable: true })
  social_links?: string[];

  @Column({ type: "varchar", length: 1024, nullable: true })
  featuredImage: string;
}
