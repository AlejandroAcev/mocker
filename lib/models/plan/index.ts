export interface Plan {
  id: string;
  name: string;
  type: string;
  level: string;
  users_allowed: number;
  request_allowed: number;
  endpoints_allowed: number;
  limit_request_per_day: number;
  default_plan: boolean;
}