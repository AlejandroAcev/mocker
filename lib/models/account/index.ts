export interface Account {
  id: string;
  name: string;
  type: string;
  plan_id: string;
  endpoints_active: number;
  endpoints_created: number;
  request_completed: number;
  request_next_limit: number;
  endpoints: string;
  users: string;
  created_at: string;
  updated_at: string;
}
