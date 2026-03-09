/**
 * Blog interfaces – for use in the frontend.
 */

export interface BlogContentItem {
  title: string;
  description: string;
  subTitle: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  language_id: number;
}

export interface Blog {
  id: number;
  order: number;
  video?: string;
  views: number;
  isFeatured: boolean;
  isPublished: boolean;
  startDate: string;
  endDate: string | null;
  content: BlogContentItem[];
  postType: string;
  slug: string;
  featuredImages?: string[];
  thumb?: string;
  mediaType?: string;
  createdAt?: string;
  updatedAt?: string;
  categories?: { id: number; [key: string]: any }[];
  createdBy?: { id: number; firstName?: string; lastName?: string; email?: string };
  magazine?: { id: number; [key: string]: any };
}

export interface CreateBlogDto {
  order?: number;
  categoryIds?: number[];
  isFeatured?: boolean;
  isPublished?: boolean;
  startDate: string;
  endDate?: string | null;
  content: BlogContentItem[];
  postType: string;
  slug: string;
  featuredImages?: string[];
  thumb?: string;
  mediaType?: string;
  video?: string;
  views?: number;
}

export interface PatchBlogDto extends Partial<CreateBlogDto> {
  id: number;
}

export interface BlogListResponse {
  data: Blog[];
  recordsFiltered?: number;
  totalRecords?: number;
}
