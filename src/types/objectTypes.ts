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

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

export type Purchase = {
  id: string;
  medicine: Medicine;
  user: User;
  family: Family;
  buy_date: string;
  expiration_date: string;
  units: number;
}