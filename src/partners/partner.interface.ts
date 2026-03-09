/**
 * Partner interfaces – for use in the frontend.
 */

export interface PartnerContentItem {
  title?: string;
  description?: string;
  language_id: number;
}

export interface Partner {
  id: number;
  content: PartnerContentItem[];
  link: string;
  featuredImage: string;
  orderIndex?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id: number; firstName?: string; lastName?: string; email?: string };
}

export interface CreatePartnerDto {
  content: PartnerContentItem[];
  link: string;
  featuredImage: string;
  orderIndex?: number;
}

export interface PatchPartnerDto extends Partial<CreatePartnerDto> {
  id: number;
}

export interface PartnerListResponse {
  data: Partner[];
  recordsFiltered?: number;
  totalRecords?: number;
}
