import { createContext } from "react";
import { FamilyContextType } from "../types/contextTypes";

export const FamilyContext = createContext<FamilyContextType>({
  families: [],
  familiesDispatch: () => {},
});
