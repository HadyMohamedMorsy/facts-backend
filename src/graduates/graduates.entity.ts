import { Base } from "src/shared/common/base/entity/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { createUserGraduatesDto } from "./dtos/create-graduates-users.dto";

@Entity()
export class Graduates extends Base {
  @Column("json", { nullable: true })
  selectUser: createUserGraduatesDto;

  @OneToOne(() => User)
  @JoinColumn({ name: "user" })
  user: User;

  @Column({ type: "varchar" })
  description_en: string;

  @Column({ type: "varchar" })
  description_ar: string;

  @Column("simple-array")
  courses: string[];

  @Column({ type: "varchar" })
  featuredImage: string;

  @Column({ type: "varchar" })
  attachment: string;
}
