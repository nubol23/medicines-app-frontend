// purchase = {
//   id,
//   medicine,
//   user,
//   family,
//   buy_date,
//   expiration_date,
//   units,
// }

import purchaseTypes from "../types/purchaseTypes";
import { Action, Purchase } from "../types/objectTypes";

export const purchaseReducer = (
  state: Array<Purchase> = [],
  action: Action
) => {
  switch (action.type) {
    case purchaseTypes.add:
      return [action.payload, ...state];

    case purchaseTypes.remove:
      return state.filter((purchase) => purchase.id !== action.payload.id);

    case purchaseTypes.update:
      return state.map((purchase) => {
        if (purchase.id === action.payload.id) {
          return {
            ...purchase,
            buy_date: action.payload.buyDate,
            expiration_date: action.payload.expirationDate,
            units: action.payload.units,
          };
        }
        return purchase;
      });

    case purchaseTypes.clear:
      // Clearing the state array
      state.length = 0;
      return state;

    default:
      return state;
  }
};
