/**
 * Service (Services Home) interfaces – for use in the frontend.
 */

export interface ServiceContentItem {
  name?: string;
  language_id: number;
}

export interface Service {
  id: number;
  content: ServiceContentItem[];
  link?: string;
  featuredImage: string;
  orderIndex?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id: number; firstName?: string; lastName?: string; email?: string };
}

export interface CreateServiceDto {
  content: ServiceContentItem[];
  link?: string;
  featuredImage: string;
  orderIndex?: number;
}

export interface PatchServiceDto extends Partial<CreateServiceDto> {
  id: number;
}

export interface ServiceListResponse {
  data: Service[];
  recordsFiltered?: number;
  totalRecords?: number;
}
