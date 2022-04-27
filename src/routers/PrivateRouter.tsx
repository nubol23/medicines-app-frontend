import React, { FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";

type Props = {
  children: React.ReactNode;
};

const PrivateRouter: FC<Props> = (props) => {
  const { user } = useContext(AuthContext);

  return user.logged ? <>{props.children}</> : <Navigate to="/login" />;
};

export default PrivateRouter;
