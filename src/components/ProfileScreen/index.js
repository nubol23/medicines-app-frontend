import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import useForm from "../../hooks/useForm";
import "./profile.scss"
import {toast} from "react-hot-toast";

const ProfileScreen = () => {
  const {userId} = useParams();

  const [{email, firstName, lastName, phoneNumber, password, confirmPassword}, handleInputChange] = useForm({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  })
  const [userButtonDisabled, setUserButtonDisabled] = useState(false);
  const [passwordButtonDisabled, setPasswordButtonDisabled] = useState(false);

  const handleUpdateUser = (e) => {
    e.preventDefault();

    if (email === "" || firstName === "" || lastName === "" || phoneNumber === "") {
      toast.error("Ningún campo debe estar vacío")
      return;
    }
  }

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (password === "" || confirmPassword === "")
      return

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden")
      return;
    }
  }

  return (
    <div className="create-medicine-screen animate__animated animate__fadeIn">
      <div className="multi-form">
        <form className="update-user-data-form" onSubmit={handleUpdateUser}>
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
          <button type="submit" className="create-medicine-button" disabled={userButtonDisabled}>Actualizar</button>
        </form>
        <hr/>
        <form className="update-user-password-form" onSubmit={handleUpdatePassword}>
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
          <button type="submit" className="create-medicine-button" disabled={passwordButtonDisabled}>Actualizar
            Contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileScreen;