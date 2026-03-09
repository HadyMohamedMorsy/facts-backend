/**
 * Gallary (Gallery) interfaces – for use in the frontend.
 */

export interface GallaryContentItem {
  accordion_title?: string;
  language_id: number;
}

export interface Gallary {
  id: number;
  tabId?: number;
  tab?: { id: number; content?: any[]; slug?: string; orderIndex?: number };
  content: GallaryContentItem[];
  files: string[];
  orderIndex?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id: number; firstName?: string; lastName?: string; email?: string };
}

export interface CreateGallaryDto {
  tabId?: number;
  content: GallaryContentItem[];
  files: string[];
  orderIndex?: number;
}

export interface PatchGallaryDto extends Partial<CreateGallaryDto> {
  id: number;
}

export interface GallaryListResponse {
  data: Gallary[];
  totalRecords?: number;
}
