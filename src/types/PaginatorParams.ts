export type PaginatorParams = {
  baseUrl: string;
  totalCount: number;
  nextUrl: string | null;
  prevUrl: string | null;
};

export type ActionType = {
  add: string;
  remove: string;
  update: string;
  addMultiple: string;
  clear: string;
};
