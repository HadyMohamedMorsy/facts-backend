/**
 * Profile interfaces – for use in the frontend.
 */

export type Gender = "male" | "female";

export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  age: string;
  gender: Gender;
  country?: string;
  phoneNumber: string;
  experience: string;
  skills: string[];
  facebook?: string;
  achievements?: string;
  attachment?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id: number; firstName?: string; lastName?: string; email?: string };
}

export interface CreateProfileDto {
  firstName: string;
  lastName: string;
  age: string;
  gender: Gender;
  country?: string;
  phoneNumber: string;
  experience: string;
  skills: string[];
  facebook?: string;
  achievements?: string;
  attachment?: string;
}

export interface PatchProfileDto extends Partial<CreateProfileDto> {
  id: number;
}

export interface ProfileListResponse {
  data: Profile[];
  recordsFiltered?: number;
  totalRecords?: number;
}
