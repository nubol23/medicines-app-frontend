// member = {
//   first_name,
//   last_name,
//   phone_number,
//   email,
//   status,
// }

import memberTypes from "../types/memberTypes";
import { Action, Member } from "../types/objectTypes";

export const memberReducer = (state: Array<Member> = [], action: Action) => {
  switch (action.type) {
    case memberTypes.add:
      return [action.payload, ...state];

    case memberTypes.remove:
      return state.filter((member) => member.user_id !== action.payload.id);

    case memberTypes.update:
      return state.map((member) => {
        if (member.user_id === action.payload.id) {
          return {
            ...member,
            first_name: action.payload.first_name,
            last_name: action.payload.last_name,
            phone_number: action.payload.phone_number,
            email: action.payload.email,
            status: action.payload.status,
          };
        }
        return member;
      });

    case memberTypes.clear:
      // Clearing the state array
      state.length = 0;
      return state;

    default:
      return state;
  }
};
