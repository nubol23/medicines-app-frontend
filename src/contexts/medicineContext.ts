import { createContext } from "react";
import { MedicineContextType } from "../types/contextTypes";

export const MedicineContext = createContext<MedicineContextType>({
  medicines: [],
  medicinesDispatch: () => {},
});
