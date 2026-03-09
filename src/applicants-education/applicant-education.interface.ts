/**
 * Applicant-Education interfaces – for use in the frontend with the applicants-education API.
 */

/** Applicant-Education as returned from API */
export interface ApplicantEducation {
  id: number;
  educationId?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id: number; firstName?: string; lastName?: string; email?: string };
  education?: { id: number; [key: string]: any };
}

/** Payload for creating an applicant-education (send educationId; createdBy set from auth) */
export interface CreateApplicantEducationDto {
  educationId: number;
  isActive?: boolean;
}

/** Payload for updating (all fields optional except id) */
export interface PatchApplicantEducationDto extends Partial<CreateApplicantEducationDto> {
  id: number;
}

export interface ApplicantEducationListResponse {
  data: ApplicantEducation[];
  recordsFiltered?: number;
  totalRecords?: number;
}
