/**
 * Hero Slider interfaces – for use in the frontend.
 */

export interface HeroSliderContentItem {
  title?: string;
  short_description?: string;
  language_id: number;
}

export interface HeroSlider {
  id: number;
  content: HeroSliderContentItem[];
  featuredImage: string;
  orderIndex?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id: number; firstName?: string; lastName?: string; email?: string };
}

export interface CreateHeroSliderDto {
  content: HeroSliderContentItem[];
  featuredImage: string;
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
