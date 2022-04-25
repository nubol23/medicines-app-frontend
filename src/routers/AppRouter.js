import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginScreen } from "../components/LoginScreen";
import { DashboardRouter } from "./DashboardRouter";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import { Toaster } from "react-hot-toast";
import ValidateUserScreen from "../components/ValidateUserScreen";
import RestorePasswordScreen from "../components/RestorePasswordScreen";
import RequestRestorePasswordScreen from "../components/RequestRestorePasswordScreen";
import RegisterScreen from "../components/RegisterScreen";

export const AppRouter = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false}/>
      <Routes>
        <Route path="validate/:userId" element={<ValidateUserScreen />} />
        <Route path="restore/:requestId" element={<RestorePasswordScreen />} />
        <Route path="restore" element={<RequestRestorePasswordScreen />} />

        <Route
          path="login"
          element={
            <PublicRouter>
              <LoginScreen />
            </PublicRouter>
          }
        />
        <Route
          path="register"
          element={
            <PublicRouter>
              <RegisterScreen />
            </PublicRouter>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRouter>
              <DashboardRouter />
            </PrivateRouter>
          }
        />
      </Routes>
    </>
  );
};
