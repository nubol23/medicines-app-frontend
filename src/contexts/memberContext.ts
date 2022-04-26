import { createContext } from "react";
import { MemberContextType } from "../types/contextTypes";

export const MemberContext = createContext<MemberContextType>({
  members: [],
  membersDispatch: () => {},
});
