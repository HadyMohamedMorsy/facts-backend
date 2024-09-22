import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Team {
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
  name: string;

  @Column({
    array: true,
  })
  phone_number: number[];

  @Column({
    type: "varchar",
    length: 512,
    nullable: false,
  })
  description: string;

  @Column({
    array: true,
  })
  social_links: string[];

  @Column({
    type: "varchar",
    length: 1024,
    nullable: true,
  })
  featuredImage?: string;
}
