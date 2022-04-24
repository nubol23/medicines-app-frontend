import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { toast } from "react-hot-toast";
import authApi from "../../apis/authApi";

const RegisterScreen = () => {
  const [
    { email, firstName, lastName, phoneNumber, password, confirmPassword },
    handleInputChange,
  ] = useForm({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();

    if (
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      phoneNumber === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no son iguales");
      return;
    }

    setDisabled(true);
    authApi
      .post("/users/register", {
        email,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        password,
      })
      .then((response) => {
        setDisabled(false);
        toast.success("Éxito! revise su correo");
        navigate("/login", { replace: true });
      })
      .catch((error) => {
        toast.error("Error al crear la cuenta");
        setDisabled(false);
      });
  };

  return (
    <div className="login-box animate__animated animate__fadeIn">
      <div className="login-content">
        <h3 className="login-header mb-4">Crear cuenta</h3>

        <form onSubmit={handleRegister} className="form-box">
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
            type="text"
            placeholder="Nombres"
            name="firstName"
            value={firstName}
            onChange={handleInputChange}
          />

          <input
            className="form-control mb-4"
            type="text"
            placeholder="Apellidos"
            name="lastName"
            value={lastName}
            onChange={handleInputChange}
          />

          <input
            className="form-control mb-4"
            type="text"
            placeholder="Teléfono"
            name="phoneNumber"
            value={phoneNumber}
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

          <input
            className="form-control mb-4"
            type="password"
            placeholder="Confirmar contraseña"
            name="confirmPassword"
            autoComplete="off"
            value={confirmPassword}
            onChange={handleInputChange}
          />

          <button type="submit" className="primary-button" disabled={disabled}>
            Registrarse
          </button>
          <Link to="/login">¿Ya tienes cuenta?</Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
