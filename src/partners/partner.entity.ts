import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Partner {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  @Column({
    type: "int",
    unique: true,
  })
  order: number;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(256)
  @Column({
    type: "varchar",
    length: 256,
  })
  title: string;

  @IsString()
  @MaxLength(1024)
  @Column({
    type: "varchar",
    length: 1024,
  })
  featuredImage: string;

  @IsNotEmpty()
  @IsString()
  @Column({
    type: "text",
  })
  description: string;
}
