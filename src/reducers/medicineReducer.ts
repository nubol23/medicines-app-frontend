import medicineTypes from "../types/medicineTypes";
import { Action, Medicine } from "../types/objectTypes";
import React from "react";

export const medicineReducer: React.Reducer<Medicine[], Action<Medicine>> = (
  state = [],
  action
) => {
  switch (action.type) {
    case medicineTypes.add:
      return [action.payload!, ...state];

    case medicineTypes.remove:
      return state.filter((medicine) => medicine.id !== action.payload!.id);

    case medicineTypes.update:
      return state.map((medicine) => {
        if (medicine.id === action.payload!.id) {
          return {
            ...medicine,
            name: action.payload!.name,
            maker: action.payload!.maker,
            quantity: action.payload!.quantity,
            unit: action.payload!.unit,
          };
        }
        return medicine;
      });

    case medicineTypes.clear:
      // Clearing the state array
      state.length = 0;
      return state;

    default:
      return state;
  }
};
