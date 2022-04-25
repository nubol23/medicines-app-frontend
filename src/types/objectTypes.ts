export type Action = {
    type: string
    payload: any
};

export type Family = {
    id: string;
    family_name: string;
}

export type Medicine = {
  id: string,
  name: string,
  maker: string,
  quantity: number,
  unit: string,
}

export type Member = {
  user_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  status: string;
}