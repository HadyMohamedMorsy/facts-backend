/**
 * Social Link interfaces – for use in the frontend.
 */

export interface SocialLink {
  id: number;
  icon: string;
  link: string;
  orderIndex?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id: number; firstName?: string; lastName?: string; email?: string };
}

export interface CreateSocialLinkDto {
  icon: string;
  link: string;
  orderIndex?: number;
}

export interface PatchSocialLinkDto extends Partial<CreateSocialLinkDto> {
  id: number;
}

export interface SocialLinkListResponse {
  data: SocialLink[];
  recordsFiltered?: number;
  totalRecords?: number;
}
