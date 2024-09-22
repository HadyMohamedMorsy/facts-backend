import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Gallary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  order: number;

  @Column({
    type: "varchar",
    length: 512,
    nullable: false,
  })
  accordion_title: string;

  @Column({
    array: true,
  })
  featuredImage?: string[];
}
