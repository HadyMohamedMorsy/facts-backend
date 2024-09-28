import { BaseTime } from "src/shared/common/base/entity/base-time.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Team } from "./team.entity";

@Entity()
export class TeamSocial extends BaseTime {
  @Column({ type: "varchar", length: 256 })
  icon: string;

  @Column({ type: "varchar", length: 256 })
  link: string;

  @ManyToOne(() => Team, team => team.social_links, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  team: Team;
}
