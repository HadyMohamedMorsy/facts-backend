import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique(["order", "language"])
export class Gallary extends Base {
  @Column({ type: "varchar", length: 256 })
  accordion_title: string;

  @Column("text", { array: true })
  files: string[];
}
