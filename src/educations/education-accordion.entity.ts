import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Education } from "./education.entity";

@Entity()
export class EducationAccordion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 512,
    nullable: false,
  })
  accordion_title: string;

  @Column({
    type: "varchar",
    length: 512,
    nullable: false,
  })
  description: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @ManyToOne(() => Education, education => education.educationAccordion, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  education: Education;
}
