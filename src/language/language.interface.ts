/**
 * Language interfaces – for use in the frontend.
 */

export interface Language {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id: number; [key: string]: any };
}

export interface CreateLanguageDto {
  name: string;
}

export interface PatchLanguageDto extends Partial<CreateLanguageDto> {
  id: number;
}

export interface LanguageListResponse {
  data: Language[];
  recordsFiltered?: number;
  totalRecords?: number;
}
