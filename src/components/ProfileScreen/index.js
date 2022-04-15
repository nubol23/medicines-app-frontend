import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import useForm from "../../hooks/useForm";
import "./profile.scss"
import {toast} from "react-hot-toast";
import useRequest from "../../hooks/useRequest";
import api from "../../apis/api";

const ProfileScreen = () => {
  const {userId} = useParams();

  const [{
    email,
    firstName,
    lastName,
    phoneNumber,
    password,
    confirmPassword
  }, handleInputChange, reset, handleSetAllValues] = useForm({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  })
  useRequest(
    () => api.get(`/users/${userId}`),
    (response) => {
      handleSetAllValues({
        email: response.data.email,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        phoneNumber: response.data.phone_number,
      })
    },
    (error) => {
    },
  )

  const [userButtonDisabled, setUserButtonDisabled] = useState(false);
  const [passwordButtonDisabled, setPasswordButtonDisabled] = useState(false);

  const handleUpdateUser = (e) => {
    e.preventDefault();

    if (email === "" || firstName === "" || lastName === "" || phoneNumber === "") {
      toast.error("Ningún campo debe estar vacío")
      return;
    }

    setUserButtonDisabled(true);
    api.patch(`/users/update/${userId}`, {
      email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    })
      .then((response) => {
        setUserButtonDisabled(false);
        toast.success("Datos actualizados correctamente");
      })
      .catch((error) => {
        setUserButtonDisabled(false);
        toast.error("Error al actualizar los datos")
      })
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
            disabled={true}
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