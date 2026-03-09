import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Team } from "./team.entity";

@Entity("team_social")
export class TeamSocial extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, team => team.socialLinks, { onDelete: "CASCADE" })
  @JoinColumn({ name: "teamId" })
  team: Team;

  @Column({ type: "varchar", length: 256 })
  icon: string;

  @Column({ type: "varchar", length: 256 })
  link: string;
}
