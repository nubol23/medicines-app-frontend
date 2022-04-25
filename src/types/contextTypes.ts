import { SessionUser } from "./objectTypes";

export type GenericDispatch = (type: { type: string; payload?: any }) => void;

export type UserDispatchType = (type: {
  type: string;
  payload?: SessionUser;
}) => void;

export type AuthContextType = {
  user: SessionUser;
  userDispatch: UserDispatchType;
};
