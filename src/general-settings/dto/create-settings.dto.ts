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
