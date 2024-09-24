import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ParentSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
