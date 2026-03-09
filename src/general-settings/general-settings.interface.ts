/**
 * General Settings interfaces – for use in the frontend.
 */

export interface GeneralSettingsContentItem {
  store_name: string;
  maintenance_message: string;
  store_address: string;
  marker?: string;
  marker_link?: string;
  meta_title: string;
  meta_favicon: string;
  logo: string;
  meta_description: string;
  meta_keywords: string;
  meta_author: string;
  meta_robots: string;
  meta_canonical: string;
  meta_image: string;
  meta_og_title: string;
  meta_og_description: string;
  meta_og_image: string;
  meta_og_url: string;
  meta_og_type: string;
  meta_og_locale: string;
  meta_og_site_name: string;
  language_id: number;
  vission?: string;
  vission_image?: string;
  mission?: string;
  mission_image?: string;
  about_facts?: string;
  about_facts_image?: string;
}

export interface GeneralSettings {
  id: number;
  content: GeneralSettingsContentItem[];
  store_email?: string;
  store_phone?: string;
  gtm_container_id?: string;
  google_analytics_id?: string;
  facebook_pixel_id?: string;
  snapchat_pixel_id?: string;
  init_tiktok_id?: string;
  gtm_enabled?: boolean;
  google_analytics_enabled?: boolean;
  facebook_pixel_enabled?: boolean;
  snapchat_pixel_enabled?: boolean;
  init_tiktok_enabled?: boolean;
  facebook_url?: string;
  instagram_url?: string;
  twitter_url?: string;
  smtp_host?: string;
  smtp_port?: number;
  smtp_email?: string;
  smtp_password?: string;
  maintenance_mode?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id: number; [key: string]: any };
}

export interface GeneralSettingsListResponse {
  data: GeneralSettings[];
  recordsFiltered?: number;
  totalRecords?: number;
}
