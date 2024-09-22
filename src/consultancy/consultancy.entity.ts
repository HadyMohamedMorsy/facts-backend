import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ConsultancyAccordion } from "./consultancy-accordion.entity";

@Entity()
export class Consultancy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  order: number;

  @Column({
    type: "varchar",
    length: 512,
  })
  title: string;

  @Column({
    type: "varchar",
    length: 256,
    unique: true,
  })
  slug: string;

  @Column({
    type: "text",
    nullable: true,
  })
  short_description?: string;

  @Column({
    type: "varchar",
    length: 1024,
    nullable: true,
  })
  featuredImage?: string;

  @OneToMany(() => ConsultancyAccordion, accordion => accordion.consultancy, {
    cascade: true,
    eager: true,
  })
  consultancyAccordion?: ConsultancyAccordion[];
}
