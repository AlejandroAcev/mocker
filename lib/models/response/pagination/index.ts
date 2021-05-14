interface PaginationLinks {
  self: string;
  first: string;
  last: string;
  next?: string;
  previous?: string;
}

export interface PaginationResponse {
  page: number;
  limit: number;          
  offset: string;
  links: PaginationLinks;
}