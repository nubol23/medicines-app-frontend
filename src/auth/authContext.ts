import { createContext } from "react";
import { AuthContextType } from "../types/contextTypes";

export const AuthContext = createContext<AuthContextType>({
  user: { logged: false },
  userDispatch: () => {},
});
