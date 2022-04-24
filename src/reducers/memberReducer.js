// member = {
//   first_name,
//   last_name,
//   phone_number,
//   email,
//   status,
// }

import memberTypes from "../types/memberTypes";

export const memberReducer = (state = [], action) => {
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
            name: action.payload.name,
            maker: action.payload.maker,
            quantity: action.payload.quantity,
            unit: action.payload.unit,
          };
        }
        return member;
      });

    case memberTypes.addMultiple:
      return [...state, ...action.payload];

    case memberTypes.clear:
      // Clearing the state array
      state.length = 0;
      return state;

    default:
      return state;
  }
};
