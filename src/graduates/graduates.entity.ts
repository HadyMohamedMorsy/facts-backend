import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Base } from "src/shared/common/base/entity/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Graduates extends Base {
  @ValidateNested({ each: true })
  @Type(() => User)
  @OneToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "varchar" })
  description_en: string;

  @Column({ type: "varchar" })
  description_ar: string;

  @Column("simple-array")
  courses: string[];

  @Column({ type: "varchar" })
  attachment: string;
}
