import authTypes from "../types/authTypes";

export const authReducer = (state = {}, action) => {
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
