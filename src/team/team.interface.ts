/**
 * Team interfaces – for use in the frontend.
 */

export interface TeamContentItem {
  name?: string;
  description?: string;
  position?: string;
  language_id: number;
}

export interface TeamSocialItem {
  id: number;
  icon: string;
  link: string;
}

export interface Team {
  id: number;
  content: TeamContentItem[];
  phoneNumber: string[];
  featuredImage: string;
  orderIndex?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id: number; firstName?: string; lastName?: string; email?: string };
  socialLinks?: TeamSocialItem[];
}

export interface CreateTeamDto {
  content: TeamContentItem[];
  phoneNumber: string[];
  featuredImage: string;
  socialLinks?: Array<{ icon: string; link: string }>;
  orderIndex?: number;
}

export interface PatchTeamDto extends Partial<CreateTeamDto> {
  id: number;
}

export interface TeamListResponse {
  data: Team[];
  recordsFiltered?: number;
  totalRecords?: number;
}
