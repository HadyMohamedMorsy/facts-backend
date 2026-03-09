import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { BannerPage } from "src/shared/enum/banner-page.enum";
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
  page: BannerPage;

  @Column({ type: "text" })
  featuredImage: string;
}
