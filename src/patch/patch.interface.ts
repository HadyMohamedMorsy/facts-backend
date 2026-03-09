/**
 * Patch (Patch Graduates) interfaces – for use in the frontend.
 */

export interface PatchContentItem {
  name?: string;
  description?: string;
  language_id: number;
}

export interface PatchGraduates {
  id: number;
  content: PatchContentItem[];
  year: string;
  files: string[];
  orderIndex?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id: number; firstName?: string; lastName?: string; email?: string };
}

export interface CreatePatchDto {
  content: PatchContentItem[];
  year: string;
  files: string[];
  orderIndex?: number;
}

export interface PatchPatchDto extends Partial<CreatePatchDto> {
  id: number;
}

export interface PatchGraduatesListResponse {
  data: PatchGraduates[];
  recordsFiltered?: number;
  totalRecords?: number;
}
