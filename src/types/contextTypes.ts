import {
  Action,
  Family,
  Medicine,
  Member,
  Purchase,
  SessionUser,
} from "./objectTypes";
import React from "react";

export type GenericDispatch = (type: { type: string; payload?: any }) => void;

export type AuthContextType = {
  user: SessionUser;
  userDispatch: React.Dispatch<Action<SessionUser>>;
};

export type FamilyContextType = {
  families: Family[];
  familiesDispatch: React.Dispatch<Action<Family | Family[]>>;
};

export type PurchaseContextType = {
  purchases: Purchase[];
  purchasesDispatch: React.Dispatch<Action<Purchase | Purchase[]>>;
};

export type MemberContextType = {
  members: Member[];
  membersDispatch: React.Dispatch<Action<Member | Member[]>>;
};

export type MedicineContextType = {
  medicines: Medicine[];
  medicinesDispatch: React.Dispatch<Action<Medicine | Medicine[]>>;
};
