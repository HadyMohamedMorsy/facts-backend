import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Consultancy } from "./consultancy.entity";

@Entity()
export class ConsultancyAccordion extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "content", type: "json", nullable: true })
  content: Array<{
    accordion_title: string;
    description: string;
    language_id: number;
  }>;

  @ManyToOne(() => Consultancy, consultancy => consultancy.consultancy_accordion, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  consultancy: Consultancy;
}
