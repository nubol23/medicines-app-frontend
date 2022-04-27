import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import "./profile.scss";
import { toast } from "react-hot-toast";
import useRequest from "../../hooks/useRequest";
import api from "../../apis/api";
import { AuthContext } from "../../auth/authContext";
import authTypes from "../../types/authTypes";
import { AxiosError, AxiosResponse } from "axios";
import { User } from "../../types/objectTypes";

const ProfileScreen = () => {
  const { userId } = useParams();

  const [
    { email, firstName, lastName, phoneNumber },
    handleInputChangeUser,
    ,
    handleSetAllValuesUser,
  ] = useForm({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const [{ password, confirmPassword }, handleInputChangePassword] = useForm({
    password: "",
    confirmPassword: "",
  });

  useRequest(
    () => api.get(`/users/${userId}`),
    (response: AxiosResponse<User>) => {
      handleSetAllValuesUser({
        email: response.data.email,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        phoneNumber: response.data.phone_number,
      });
    },
    (error: AxiosError) => {
      toast.error("Error al cargar la información del usuario");
    }
  );

  const [userButtonDisabled, setUserButtonDisabled] = useState(false);
  const [passwordButtonDisabled, setPasswordButtonDisabled] = useState(false);

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      phoneNumber === ""
    ) {
      toast.error("Ningún campo debe estar vacío");
      return;
    }

    setUserButtonDisabled(true);
    api
      .patch(`/users/update/${userId}`, {
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
        toast.error("Error al actualizar los datos");
      });
  };

  const { userDispatch } = useContext(AuthContext);
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === "" || confirmPassword === "") return;

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setPasswordButtonDisabled(true);
    api
      .patch(`/users/update/${userId}`, { password })
      .then((response) => {
        setPasswordButtonDisabled(false);
        userDispatch({ type: authTypes.logout });
        toast.success("Contraseña actualizada correctamente");
      })
      .catch((error) => {
        setPasswordButtonDisabled(false);
        toast.error("Error al actualizar la contraseña");
      });
  };

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
            onChange={handleInputChangeUser}
            disabled={true}
          />

          <input
            className="form-control mb-4"
            type="text"
            placeholder="Nombres"
            name="firstName"
            value={firstName}
            onChange={handleInputChangeUser}
          />

          <input
            className="form-control mb-4"
            type="text"
            placeholder="Apellidos"
            name="lastName"
            value={lastName}
            onChange={handleInputChangeUser}
          />

          <input
            className="form-control mb-4"
            type="text"
            placeholder="Teléfono"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleInputChangeUser}
          />
          <button
            type="submit"
            className="create-medicine-button"
            disabled={userButtonDisabled}
          >
            Actualizar
          </button>
        </form>
        <hr />
        <form
          className="update-user-password-form"
          onSubmit={handleUpdatePassword}
        >
          <input
            className="form-control mb-4"
            type="password"
            placeholder="Nueva contraseña"
            name="password"
            autoComplete="off"
            value={password}
            onChange={handleInputChangePassword}
          />

          <input
            className="form-control mb-4"
            type="password"
            placeholder="Confirmar contraseña"
            name="confirmPassword"
            autoComplete="off"
            value={confirmPassword}
            onChange={handleInputChangePassword}
          />
          <button
            type="submit"
            className="create-medicine-button"
            disabled={passwordButtonDisabled}
          >
            Actualizar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileScreen;
