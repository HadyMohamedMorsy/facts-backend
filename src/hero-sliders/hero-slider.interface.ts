/**
 * Hero Slider interfaces – for use in the frontend.
 */

export interface HeroSliderContentItem {
  title?: string;
  short_description?: string;
  kicker?: string;
  eyebrow?: string;
  accent?: string;
  standards?: string;
  cta_label?: string;
  cta_link?: string;
  language_id: number;
}

export interface HeroSlider {
  id: number;
  content: HeroSliderContentItem[];
  featuredImage?: string;
  video?: string;
  type?: "image" | "video";
  orderIndex?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id: number; firstName?: string; lastName?: string; email?: string };
}

export interface CreateHeroSliderDto {
  content: HeroSliderContentItem[];
  featuredImage?: string;
  video?: string;
  type?: "image" | "video";
  orderIndex?: number;
}

export interface PatchHeroSliderDto extends Partial<CreateHeroSliderDto> {
  id: number;
}

export interface HeroSliderListResponse {
  data: HeroSlider[];
  recordsFiltered?: number;
  totalRecords?: number;
}
