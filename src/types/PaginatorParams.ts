export type PaginatorParams = {
  baseUrl: string;
  totalCount: number;
  nextUrl: string;
  prevUrl: string;
};

export type ActionType = {
  add: string;
  remove: string;
  update: string;
  addMultiple: string;
  clear: string;
};
