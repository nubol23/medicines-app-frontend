import React from 'react';
import useForm from "../../hooks/useForm";
import {toast} from "react-hot-toast";
import authApi from "../../apis/authApi";

const RequestRestorePasswordScreen = () => {

  const [{email}, handleInputChange] = useForm({email: ''})

  const handleRequestRestore = (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error("El correo es requisito")
      return;
    }

    authApi.post(`/users/restoration`, {email})
      .then((response) => {
        toast.success("Se enviaron las instruccions al email")
      })
      .catch((error) => {
        toast.error("Error al enviar email")
      })
  }

  return (
    <div className="login-box animate__animated animate__fadeIn">

      <div className="login-content">

        <form onSubmit={handleRequestRestore} className="form-box">
          <input
            className="form-control mb-4"
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleInputChange}
          />

          <button type='submit' className="primary-button">
            Recuperar contraseña
          </button>
        </form>

      </div>
    </div>
  );
};

export default RequestRestorePasswordScreen;