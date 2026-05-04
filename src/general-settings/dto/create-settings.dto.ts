import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { User } from "src/users/user.entity";

export class ContentDto {
  @IsString()
  store_name: string;

  @IsString()
  @IsOptional()
  maintenance_message?: string;

  @IsString()
  @IsOptional()
  store_address?: string;

  @IsString()
  @IsOptional()
  marker?: string;

  @IsString()
  @IsOptional()
  marker_link?: string;

  @IsString()
  @IsOptional()
  meta_title?: string;

  @IsString()
  @IsOptional()
  meta_favicon?: string;

  @IsString()
  @IsOptional()
  logo?: string;

  @IsString()
  @IsOptional()
  meta_description?: string;

  @IsString()
  @IsOptional()
  meta_keywords?: string;

  @IsString()
  @IsOptional()
  meta_author?: string;

  @IsString()
  @IsOptional()
  meta_robots?: string;

  @IsString()
  @IsOptional()
  meta_canonical?: string;

  @IsString()
  @IsOptional()
  meta_image?: string;

  @IsString()
  @IsOptional()
  meta_og_title?: string;

  @IsString()
  @IsOptional()
  meta_og_description?: string;

  @IsString()
  @IsOptional()
  meta_og_image?: string;

  @IsString()
  @IsOptional()
  meta_og_url?: string;

  @IsString()
  @IsOptional()
  meta_og_type?: string;

  @IsString()
  @IsOptional()
  meta_og_locale?: string;

  @IsString()
  @IsOptional()
  meta_og_site_name?: string;

  @IsString()
  @IsOptional()
  vission?: string;

  @IsString()
  @IsOptional()
  vission_image?: string;

  @IsString()
  @IsOptional()
  mission?: string;

  @IsString()
  @IsOptional()
  mission_image?: string;

  @IsString()
  @IsOptional()
  about_facts?: string;

  @IsString()
  @IsOptional()
  about_facts_image?: string;

  @IsString()
  @IsOptional()
  facts_slider_content?: string;

  @IsString()
  @IsOptional()
  statistics_eyebrow?: string;

  @IsString()
  @IsOptional()
  statistics_title?: string;

  @IsString()
  @IsOptional()
  statistics_subtitle?: string;

  @IsString()
  @IsOptional()
  statistics_kicker?: string;

  @IsString()
  @IsOptional()
  team_intro?: string;

  @IsString()
  @IsOptional()
  about_feat_1_l1?: string;

  @IsString()
  @IsOptional()
  about_feat_1_l2?: string;

  @IsString()
  @IsOptional()
  about_feat_1_body?: string;

  @IsString()
  @IsOptional()
  about_feat_1_image?: string;

  @IsString()
  @IsOptional()
  about_feat_2_l1?: string;

  @IsString()
  @IsOptional()
  about_feat_2_l2?: string;

  @IsString()
  @IsOptional()
  about_feat_2_body?: string;

  @IsString()
  @IsOptional()
  about_feat_2_image?: string;

  @IsString()
  @IsOptional()
  about_feat_3_l1?: string;

  @IsString()
  @IsOptional()
  about_feat_3_l2?: string;

  @IsString()
  @IsOptional()
  about_feat_3_body?: string;

  @IsString()
  @IsOptional()
  about_feat_3_image?: string;

  @IsString()
  @IsOptional()
  about_feat_4_l1?: string;

  @IsString()
  @IsOptional()
  about_feat_4_l2?: string;

  @IsString()
  @IsOptional()
  about_feat_4_body?: string;

  @IsString()
  @IsOptional()
  about_feat_4_image?: string;

  @IsString()
  @IsOptional()
  management_feat_1_l1?: string;

  @IsString()
  @IsOptional()
  management_feat_1_l2?: string;

  @IsString()
  @IsOptional()
  management_feat_1_body?: string;

  @IsString()
  @IsOptional()
  management_feat_1_image?: string;

  @IsString()
  @IsOptional()
  management_feat_2_l1?: string;

  @IsString()
  @IsOptional()
  management_feat_2_l2?: string;

  @IsString()
  @IsOptional()
  management_feat_2_body?: string;

  @IsString()
  @IsOptional()
  management_feat_2_image?: string;

  @IsString()
  @IsOptional()
  management_feat_3_l1?: string;

  @IsString()
  @IsOptional()
  management_feat_3_l2?: string;

  @IsString()
  @IsOptional()
  management_feat_3_body?: string;

  @IsString()
  @IsOptional()
  management_feat_3_image?: string;

  @IsString()
  @IsOptional()
  management_feat_4_l1?: string;

  @IsString()
  @IsOptional()
  management_feat_4_l2?: string;

  @IsString()
  @IsOptional()
  management_feat_4_body?: string;

  @IsString()
  @IsOptional()
  management_feat_4_image?: string;

  @IsNumber()
  @Type(() => Number)
  language_id: number;
}

export class CreateGeneralSettingsDto {
  // Store Information
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContentDto)
  content: ContentDto[];

  @IsEmail()
  @IsOptional()
  store_email?: string;

  @IsString()
  @IsOptional()
  store_phone?: string;

  // Google Tag Manager
  @IsString()
  @IsOptional()
  gtm_container_id?: string;

  @IsString()
  @IsOptional()
  google_analytics_id?: string;

  @IsString()
  @IsOptional()
  facebook_pixel_id?: string;

  @IsString()
  @IsOptional()
  snapchat_pixel_id?: string;

  @IsString()
  @IsOptional()
  init_tiktok_id?: string;

  @IsBoolean()
  @IsOptional()
  gtm_enabled?: boolean;

  @IsBoolean()
  @IsOptional()
  google_analytics_enabled?: boolean;

  @IsBoolean()
  @IsOptional()
  facebook_pixel_enabled?: boolean;

  @IsBoolean()
  @IsOptional()
  snapchat_pixel_enabled?: boolean;

  @IsBoolean()
  @IsOptional()
  init_tiktok_enabled?: boolean;

  // Social Media
  @IsString()
  @IsOptional()
  facebook_url?: string;

  @IsString()
  @IsOptional()
  instagram_url?: string;

  @IsString()
  @IsOptional()
  twitter_url?: string;

  // Email Settings
  @IsString()
  @IsOptional()
  smtp_host?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  smtp_port?: number;

  @IsEmail()
  @IsOptional()
  smtp_email?: string;

  @IsString()
  @IsOptional()
  smtp_password?: string;

  // Maintenance Mode
  @IsBoolean()
  @IsOptional()
  maintenance_mode?: boolean;

  createdBy: User;
}
