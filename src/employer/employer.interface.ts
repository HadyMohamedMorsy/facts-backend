/**
 * Employer interfaces – for use in the frontend.
 */

export interface Employer {
  id: number;
  companyName: string;
  businessType: string;
  industry: string;
  isActive: boolean;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  websiteUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id: number; firstName?: string; lastName?: string; email?: string };
}

export interface CreateEmployerDto {
  companyName: string;
  businessType: string;
  industry: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  websiteUrl?: string;
}

export interface PatchEmployerDto extends Partial<CreateEmployerDto> {
  id: number;
}

export interface EmployerListResponse {
  data: Employer[];
  recordsFiltered?: number;
  totalRecords?: number;
}
