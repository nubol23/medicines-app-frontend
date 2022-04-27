import React, { FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";

type Props = {
  children: React.ReactNode;
};

const PublicRouter: FC<Props> = (props) => {
  const { user } = useContext(AuthContext);

  return user.logged ? <Navigate to="/home" /> : <>{props.children}</>;
};

export default PublicRouter;
