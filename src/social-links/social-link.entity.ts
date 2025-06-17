import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class SocialLink extends BaseMemberEntity {
  @Column({ type: "text" })
  icon: string;

  @Column({ type: "text" })
  link: string;

  @Column({ type: "int", nullable: true })
  order: number;
}
