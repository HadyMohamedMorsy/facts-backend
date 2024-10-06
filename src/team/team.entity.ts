import { Base } from "src/shared/common/base/entity/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { TeamSocial } from "./team-social.entity";

@Entity()
export class Team extends Base {
  @Column({ type: "varchar", length: 256 })
  name_en: string;

  @Column({ type: "varchar", length: 256 })
  name_ar: string;

  @Column("text", { array: true })
  phone_number: string[];

  @Column("text")
  description_en: string;

  @Column("text")
  description_ar: string;

  @Column({ type: "text", nullable: true })
  position_en: string;

  @Column({ type: "text", nullable: true })
  position_ar: string;

  @OneToMany(() => TeamSocial, social => social.team, {
    cascade: true,
    eager: true,
  })
  social_links: TeamSocial[];

  @Column({ type: "varchar", length: 1024 })
  featuredImage: string;
}
