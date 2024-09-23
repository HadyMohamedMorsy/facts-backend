import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string; // 'ar' for Arabic, 'en' for English, etc.
}
