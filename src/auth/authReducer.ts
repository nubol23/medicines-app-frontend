import authTypes from "../types/authTypes";
import { Action } from "../types/objectTypes";
import { SessionUser } from "../types/objectTypes";

export const authReducer = (
  state: SessionUser = { logged: false },
  action: Action
) => {
  switch (action.type) {
    case authTypes.login:
      return {
        ...action.payload,
        logged: true,
      };

    case authTypes.logout:
      return {
        logged: false,
      };

    default:
      return state;
  }
};
