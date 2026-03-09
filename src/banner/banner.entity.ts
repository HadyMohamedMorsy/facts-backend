import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Banner extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "content", type: "json", nullable: true })
  content: Array<{
    title: string;
    short_description?: string;
    language_id: number;
  }>;

  @Column({ length: 256, unique: true })
  page: string;

  @Column({ type: "text" })
  featuredImage: string;
}
