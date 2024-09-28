import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity, OneToMany, Unique } from "typeorm";
import { TeamSocial } from "./team-social.entity";

@Entity()
@Unique(["order", "language"])
export class Team extends Base {
  @Column({ type: "varchar", length: 256 })
  name: string;

  @Column("text", { array: true })
  phone_number: string[];

  @Column("text")
  description: string;

  @OneToMany(() => TeamSocial, social => social.team)
  social_links: TeamSocial[];

  @Column({ type: "varchar", length: 1024 })
  featuredImage: string;
}
