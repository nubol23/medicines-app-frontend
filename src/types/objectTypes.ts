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