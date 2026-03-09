/**
 * Tab interfaces – for use in the frontend.
 */

export interface TabContentItem {
  title?: string;
  language_id: number;
}

export interface Tab {
  id: number;
  content: TabContentItem[];
  slug?: string;
  orderIndex?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id: number; firstName?: string; lastName?: string; email?: string };
}

export interface CreateTabDto {
  content: TabContentItem[];
  slug?: string;
  orderIndex?: number;
}

export interface PatchTabDto extends Partial<CreateTabDto> {
  id: number;
}

export interface TabListResponse {
  data: Tab[];
  recordsFiltered?: number;
  totalRecords?: number;
}
