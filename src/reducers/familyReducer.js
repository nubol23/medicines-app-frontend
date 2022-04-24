import familyTypes from "../types/familyTypes";

// family := {
//   id,
//   name,
// }

export const familyReducer = (state = [], action) => {
  switch (action.type) {
    case familyTypes.addFamily:
      return [action.payload, ...state];

    case familyTypes.removeFamily:
      return state.filter((family) => family.id !== action.payload.id);

    case familyTypes.updateFamily:
      return state.map((family) => {
        if (family.id === action.payload.id) {
          return {
            ...family,
            name: action.payload.name,
          };
        }
        return family;
      });

    case familyTypes.addMultiple:
      return [...state, ...action.payload];

    case familyTypes.clear:
      // Clearing the state array
      state.length = 0;
      return state;

    default:
      return state;
  }
};
