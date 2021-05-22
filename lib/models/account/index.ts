export type AccountType = 'personal' | 'professional';

export interface NewAccount {
  name?: string;
  type: AccountType;
  users: string;
}

export interface Account extends NewAccount {
  id: string;
  plan_id: string;
  endpoints_active: number;
  endpoints_created: number;
  request_completed: number;
  request_next_limit: number;
  endpoints?: string;
  created_at: string;
  updated_at: string;
}
