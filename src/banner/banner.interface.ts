/**
 * Banner interfaces – for use in the frontend.
 */

export interface BannerContentItem {
  title: string;
  short_description?: string;
  language_id: number;
}

export interface Banner {
  id: number;
  content: BannerContentItem[];
  page: string;
  featuredImage: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBannerDto {
  content: BannerContentItem[];
  page: string;
  featuredImage: string;
}

export interface PatchBannerDto extends Partial<CreateBannerDto> {
  id: number;
}

export interface BannerListResponse {
  data: Banner[];
  recordsFiltered?: number;
  totalRecords?: number;
}
