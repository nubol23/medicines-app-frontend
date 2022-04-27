import React, { ReactPropTypes, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";

type Props = {
  children: React.ReactNode;
};

const PrivateRouter = ({ children }: Props): JSX.Element => {
  const { user } = useContext(AuthContext);

  return user.logged ? (children as JSX.Element) : <Navigate to="/login" />;
};

export default PrivateRouter;
