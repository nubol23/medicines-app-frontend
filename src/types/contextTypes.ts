import { Family, Medicine, Member, Purchase, SessionUser } from "./objectTypes";
import exp from "constants";

export type GenericDispatch = (type: { type: string; payload?: any }) => void;

export type UserDispatchType = (type: {
  type: string;
  payload?: SessionUser;
}) => void;

export type AuthContextType = {
  user: SessionUser;
  userDispatch: UserDispatchType;
};

export type FamilyContextType = {
  families: Array<Family>;
  familiesDispatch: (type: {
    type: string;
    payload?: Family | Array<Family>;
  }) => void;
};

export type PurchaseContextType = {
  purchases: Array<Purchase>;
  purchasesDispatch: (type: {
    type: string;
    payload?: Purchase | Array<Purchase>;
  }) => void;
};

export type MemberContextType = {
  members: Array<Member>;
  membersDispatch: (type: {
    type: string;
    payload?: Member | Array<Member>;
  }) => void;
};

export type MedicineContextType = {
  medicines: Array<Medicine>;
  medicinesDispatch: (type: {
    type: string;
    payload?: Medicine | Array<Medicine>;
  }) => void;
};
