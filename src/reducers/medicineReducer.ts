// medicine = {
//   id,
//   name,
//   maker,
//   quantity,
//   unit,
// }

import medicineTypes from "../types/medicineTypes";
import {Action, Medicine} from "../types/objectTypes";

export const medicineReducer = (state: Array<Medicine> = [], action: Action) => {
  switch (action.type) {
    case medicineTypes.add:
      return [action.payload, ...state];

    case medicineTypes.remove:
      return state.filter((medicine) => medicine.id !== action.payload.id);

    case medicineTypes.update:
      return state.map((medicine) => {
        if (medicine.id === action.payload.id) {
          return {
            ...medicine,
            name: action.payload.name,
            maker: action.payload.maker,
            quantity: action.payload.quantity,
            unit: action.payload.unit,
          };
        }
        return medicine;
      });

    case medicineTypes.addMultiple:
      return [...state, ...action.payload];

    case medicineTypes.clear:
      // Clearing the state array
      state.length = 0;
      return state;

    default:
      return state;
  }
};
