export interface NewUser {
  name: string;
  lastname: string;
  email: string;
  date_of_birth: string;
  role: string;
}

export interface User extends NewUser {
  id: string;
  account_id: string;
  total_endpoints_created: number;
  endpoints_active: number;
  created_at: string;
  updated_at: string;
  is_verified: boolean;
}