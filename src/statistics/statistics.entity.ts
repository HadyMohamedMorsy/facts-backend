import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Statistics extends Base {
  @Column({ length: 256 })
  title: string;

  @Column({ type: "int" })
  value: string;

  @Column({ type: "text", nullable: true })
  icon?: string;
}
