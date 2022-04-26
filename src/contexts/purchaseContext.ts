import { createContext } from "react";
import { PurchaseContextType } from "../types/contextTypes";

export const PurchaseContext = createContext<PurchaseContextType>({
  purchases: [],
  purchasesDispatch: () => {},
});
