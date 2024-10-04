import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class SocialLink extends Base {
  @Column({ type: "text" })
  icon: string;

  @Column({ type: "text" })
  link: string;
}
