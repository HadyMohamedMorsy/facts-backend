import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Base } from "src/shared/common/base/base.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique(["order", "language"])
export class Partner extends Base {
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
