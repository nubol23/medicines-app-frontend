import authTypes from "../types/authTypes";
import { Action } from "../types/objectTypes";
import { SessionUser } from "../types/objectTypes";
import React from "react";

export const authReducer: React.Reducer<SessionUser, Action<SessionUser>> = (
  state = { logged: false },
  action
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
