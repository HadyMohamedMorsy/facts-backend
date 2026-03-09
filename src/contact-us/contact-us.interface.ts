/**
 * Contact (Contact-Us) interfaces – for use in the frontend.
 */

export interface Contact {
  id: number;
  email: string;
  fullName: string;
  subject: string;
  phoneNumber: string;
  message?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateContactDto {
  email: string;
  fullName: string;
  subject: string;
  phoneNumber: string;
  message?: string;
}

export interface PatchContactDto extends Partial<CreateContactDto> {
  id: number;
}

export interface ContactListResponse {
  data: Contact[];
  recordsFiltered?: number;
  totalRecords?: number;
}
