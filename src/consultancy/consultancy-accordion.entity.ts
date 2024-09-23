import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Consultancy } from "./consultancy.entity";

@Entity()
export class ConsultancyAccordion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 256,
  })
  accordion_title: string;

  @Column({
    type: "varchar",
    length: 256,
  })
  description: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @ManyToOne(() => Consultancy, consultancy => consultancy.consultancyAccordion, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  consultancy: Consultancy;
}
