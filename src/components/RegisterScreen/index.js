import React from 'react';
import {Link} from "react-router-dom";
import useForm from "../../hooks/useForm";

const RegisterScreen = () => {

  const [{email, firstName, lastName, phoneNumber, password, confirmPassword}, handleInputChange] = useForm({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  })

  const handleRegister = (e) => {
    e.preventDefault();
  }

  return (
    <div className="login-box animate__animated animate__fadeIn">

      <div className="login-content">

        <h3 className="login-header mb-4">Medicines App</h3>

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
            autoComplete='off'
            value={password}
            onChange={handleInputChange}
          />

          <input
            className="form-control mb-4"
            type="password"
            placeholder="Confirmar contraseña"
            name="confirmPassword"
            autoComplete='off'
            value={confirmPassword}
            onChange={handleInputChange}
          />

          <button type='submit' className="primary-button">
            Registrarse
          </button>
          <Link to="/login">¿Ya tienes cuenta?</Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;