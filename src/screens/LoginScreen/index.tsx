import jwtDecode from "jwt-decode";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../apis/authApi";
import { AuthContext } from "../../auth/authContext";
import authTypes from "../../types/authTypes";
import "./login.scss";
import { toast } from "react-hot-toast";
import { TokenContent } from "../../types/objectTypes";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";

export const LoginScreen = () => {
  const { userDispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  type FormValues = {
    email: string;
    password: string;
  };

  const validateLogin = (values: FormValues) => {
    let errors = {};
    if (!values.email) errors = { ...errors, email: "Correo requerido" };
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
      errors = { ...errors, email: "Formato de correo inválido" };

    if (!values.password)
      errors = { ...errors, password: "Contraseña requerida" };

    return errors;
  };

  const handleLogin = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    authApi
      .post("users/token/", {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        const decoded = jwtDecode<TokenContent>(response.data.access);
        const payload = {
          accessToken: response.data.access,
          refreshToken: response.data.refresh,
          issuedAt: decoded.iat,
          expiresAt: decoded.exp,
          userId: decoded.user_id,
          firstName: decoded.first,
          email: decoded.email,
        };

        userDispatch({ type: authTypes.login, payload });

        navigate("/", { replace: true });
      })
      .catch((error) => {
        toast.error("Credenciales inválidas");
      });

    setSubmitting(false);
  };

  return (
    <div className="login-box animate__animated animate__fadeIn">
      <div className="login-content">
        <h3 className="login-header mb-4">Medicines App</h3>

        <Formik
          initialValues={{ email: "", password: "" }}
          validate={validateLogin}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="form-box">
              <div className="mb-4">
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="mb-4">
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>

              <button
                type="submit"
                className="primary-button"
                disabled={isSubmitting}
              >
                Login
              </button>

              <Link to="/register">¿No tienes cuenta?</Link>
            </Form>
          )}
        </Formik>
        <br />
        <Link to="/restore">¿Olvidaste tu contraseña?</Link>
      </div>
    </div>
  );
};
