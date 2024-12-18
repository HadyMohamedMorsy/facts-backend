import { IsString, MaxLength } from "class-validator";
import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Statistics extends Base {
  @Column({
    unique: true,
    type: "int",
    nullable: true,
  })
  order: number;

  @Column({ length: 256 })
  title_en: string;

  @Column({ length: 256 })
  title_ar: string;

  @Column({ type: "int" })
  value: string;

  @IsString()
  @MaxLength(1024)
  @Column({
    type: "varchar",
    length: 1024,
  })
  icon: string;
}
