import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";

type Props = {
  children: React.ReactNode;
};

const PublicRouter = ({ children }: Props): JSX.Element => {
  const { user } = useContext(AuthContext);

  return user.logged ? <Navigate to="/home" /> : (children as JSX.Element);
};

export default PublicRouter;
