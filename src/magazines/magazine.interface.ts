/**
 * Magazine interfaces – for use in the frontend.
 */

export interface MagazineContentItem {
  title?: string;
  short_description?: string;
  language_id: number;
}

export interface Magazine {
  id: number;
  content: MagazineContentItem[];
  slug: string;
  featuredImage: string;
  publicationDate?: string;
  orderIndex?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id: number; firstName?: string; lastName?: string; email?: string };
  categories?: { id: number; content?: any[]; slug?: string }[];
}

export interface CreateMagazineDto {
  content: MagazineContentItem[];
  slug: string;
  featuredImage: string;
  publicationDate?: string;
  orderIndex?: number;
  categoryIds?: number[];
}

export interface PatchMagazineDto extends Partial<CreateMagazineDto> {
  id: number;
}

export interface MagazineListResponse {
  data: Magazine[];
  recordsFiltered?: number;
  totalRecords?: number;
}
