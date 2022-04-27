import familyTypes from "../types/familyTypes";
import { Family, Action } from "../types/objectTypes";
import React from "react";

export const familyReducer: React.Reducer<Family[], Action<Family>> = (
  state = [],
  action
) => {
  switch (action.type) {
    case familyTypes.add:
      return [action.payload!, ...state];

    case familyTypes.remove:
      return state.filter((family) => family.id !== action.payload!.id);

    case familyTypes.update:
      return state.map((family) => {
        if (family.id === action.payload!.id) {
          return {
            ...family,
            name: action.payload!.family_name,
          };
        }
        return family;
      });

    case familyTypes.clear:
      // Clearing the state array
      state.length = 0;
      return state;

    default:
      return state;
  }
};
