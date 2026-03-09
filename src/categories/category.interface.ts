/**
 * Category interfaces – for use in the frontend.
 */

export type CategoryType = "product" | "blog";

export interface CategoryContentItem {
  name: string;
  description: string;
  language_id: number;
}

export interface Category {
  id: number;
  content: CategoryContentItem[];
  slug: string;
  categoryType: CategoryType;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id: number; firstName?: string; lastName?: string; email?: string };
}

export interface CreateCategoryDto {
  content: CategoryContentItem[];
  categoryType: CategoryType;
  slug: string;
  image?: string;
}

export interface PatchCategoryDto extends Partial<CreateCategoryDto> {
  id: number;
}

export interface CategoryListResponse {
  data: Category[];
  recordsFiltered?: number;
  totalRecords?: number;
}
