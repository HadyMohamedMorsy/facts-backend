/**
 * User interfaces – for use in the frontend.
 */

export type Role =
  | "CEO"
  | "ANALYST"
  | "AUDITOR"
  | "SUPER_ADMIN"
  | "SALES_DIRECTOR"
  | "OPERATIONS_DIRECTOR"
  | "ACCOUNTANT"
  | "FINANCE_MANAGER"
  | "SYSTEM_ADMIN"
  | "CONTENT_MANAGER"
  | "MARKETING_MANAGER"
  | "SEO_SPECIALIST"
  | "STORE_MANAGER"
  | "INVENTORY_MANAGER"
  | "ORDER_MANAGER"
  | "CUSTOMER_SERVICE"
  | "VIP_CUSTOMER"
  | "WHOLESALE_CUSTOMER"
  | "CUSTOMER"
  | "TECH_SUPPORT";

export type UserStatus = "customer" | "user";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username?: string;
  role: Role;
  phoneNumber: string;
  avatar?: string;
  birthOfDate: string;
  email: string;
  type?: UserStatus;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: User;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  username?: string;
  role: Role;
  phoneNumber: string;
  birthOfDate: string;
  email: string;
  password?: string;
}

export interface PatchUserDto extends Partial<CreateUserDto> {
  id: number;
}

export interface UserListResponse {
  data: User[];
  recordsFiltered?: number;
  totalRecords?: number;
}
