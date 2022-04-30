import exp from "constants";

export type TokenContent = {
  iat: number;
  exp: number;
  user_id: string;
  first: string;
  email: string;
};

export type SessionUser = {
  accessToken?: string;
  email?: string;
  expiresAt?: number;
  firstName?: string;
  issuedAt?: number;
  logged?: boolean;
  refreshToken?: string;
  userId?: string;
};

export type Action<T = any> = {
  type: string;
  payload?: T;
};

export type PaginatedResponse<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
  current: number;
  pages: number;
};

export type Family = {
  id?: string;
  family_name?: string;
};

export type Medicine = {
  id?: string;
  name?: string;
  maker?: string;
  quantity?: number;
  unit?: string;
};

export type Member = {
  id?: string;
  user_id?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;
  status?: string;
};

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
};

export type Purchase = {
  id?: string;
  medicine?: Medicine;
  user?: User;
  family?: Family;
  buy_date?: string;
  expiration_date?: string;
  units?: number;
  consumed?: boolean;
  is_expired?: boolean;
};

export type CorrectResponse = {
  message: string;
};

export type ErrorResponse = {
  error: string;
};
