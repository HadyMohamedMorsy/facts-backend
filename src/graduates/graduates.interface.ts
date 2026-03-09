/**
 * Graduates interfaces – for use in the frontend.
 */

export interface GraduatesContentItem {
  description: string;
  language_id: number;
}

export interface Graduates {
  id: number;
  content: GraduatesContentItem[];
  type: string;
  slug: string;
  courses: string[];
  courseName: string;
  codeCertification: string;
  dateCourse?: string;
  featuredImage: string;
  attachment: string;
  imageCertification: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id: number; firstName?: string; lastName?: string; email?: string };
  user?: { id: number; username?: string; firstName?: string; lastName?: string; email?: string };
}

export interface CreateGraduateDto {
  userId?: number;
  content: GraduatesContentItem[];
  slug: string;
  type: string;
  courses: string[];
  courseName?: string;
  codeCertification?: string;
  dateCourse?: string;
  featuredImage: string;
  attachment: string;
  imageCertification: string;
}

export interface PatchGraduateDto extends Partial<CreateGraduateDto> {
  id: number;
}

export interface GraduatesListResponse {
  data: Graduates[];
  recordsFiltered?: number;
  totalRecords?: number;
}
