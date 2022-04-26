import jwtDecode from "jwt-decode";
import React, { SyntheticEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../apis/authApi";
import { AuthContext } from "../../auth/authContext";
import useForm from "../../hooks/useForm";
import authTypes from "../../types/authTypes";
import "./login.scss";
import { toast } from "react-hot-toast";
import { TokenContent } from "../../types/objectTypes";

export const LoginScreen = () => {
  const { userDispatch } = useContext(AuthContext);
  const [buttonDisabled, setDisabled] = useState(false);

  const [{ email, password }, handleInputChange] = useForm<any>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = (e: SyntheticEvent) => {
    e.preventDefault();

    if (email === "" || password === "") return;

    setDisabled(true);
    authApi
      .post("users/token/", {
        email,
        password,
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

        setDisabled(false);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        toast.error("Credenciales inválidas");
        setDisabled(false);
      });
  };

  return (
    <div className="login-box animate__animated animate__fadeIn">
      <div className="login-content">
        <h3 className="login-header mb-4">Medicines App</h3>

        <form onSubmit={handleLogin} className="form-box">
          <input
            className="form-control mb-4"
            type="text"
            placeholder="Correo"
            name="email"
            value={email}
            onChange={handleInputChange}
          />

          <input
            className="form-control mb-4"
            type="password"
            placeholder="Contraseña"
            name="password"
            autoComplete="off"
            value={password}
            onChange={handleInputChange}
          />

          {/*<button type='submit' className="btn btn-primary btn-block">*/}
          <button
            type="submit"
            className="primary-button"
            disabled={buttonDisabled}
          >
            Login
          </button>
          <Link to="/register">¿No tienes cuenta?</Link>
        </form>
        <br />
        <Link to="/restore">¿Olvidaste tu contraseña?</Link>
      </div>
    </div>
  );
};
