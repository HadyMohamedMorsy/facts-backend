/**
 * Applicant-Graduates interfaces – for use in the frontend with the applicants-graduates API.
 */

/** Applicant-Graduates as returned from API */
export interface ApplicantGraduates {
  id: number;
  graduateId?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id: number; firstName?: string; lastName?: string; email?: string };
  graduate?: { id: number; [key: string]: any };
}

/** Payload for creating an applicant-graduate (send graduateId; createdBy set from auth) */
export interface CreateApplicantGraduatesDto {
  graduateId: number;
  isActive?: boolean;
}

/** Payload for updating (all fields optional except id) */
export interface PatchApplicantGraduatesDto extends Partial<CreateApplicantGraduatesDto> {
  id: number;
}

export interface ApplicantGraduatesListResponse {
  data: ApplicantGraduates[];
  recordsFiltered?: number;
  totalRecords?: number;
}
