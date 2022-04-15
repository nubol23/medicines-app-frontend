import React from 'react';
import useForm from "../../hooks/useForm";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-hot-toast";
import authApi from "../../apis/authApi";

const RestorePasswordScreen = () => {

  const {requestId} = useParams();
  const navigate = useNavigate();

  const [{password, passwordConfirm}, handleInputChange] = useForm({
    password: '',
    passwordConfirm: '',
  })

  const handleRestore = (e) => {
    e.preventDefault();

    if (password === "" || passwordConfirm === "")
      toast.error("Ambos campos son obligatorios")

    if (password !== passwordConfirm)
      toast.error("Los campos no coinciden")

    authApi.post(`/users/restoration/${requestId}`, {password})
      .then((response) => {
        toast.success("Contraseña restaurada exitosamente")
        navigate("/login", {replace: true});
      })
      .catch((error) => {
        let errorMsg = error.response.data.error
        if (errorMsg === "Expired request")
          toast.error("Solicitud expirada")
        else
          toast.error("Error al restaurar contraseña")
      })
  }

  return (
    <div className="login-box animate__animated animate__fadeIn">

      <div className="login-content">

        <form onSubmit={handleRestore} className="form-box">
          <input
            className="form-control mb-4"
            type="password"
            placeholder="Nueva contraseña"
            name="password"
            value={password}
            onChange={handleInputChange}
          />

          <input
            className="form-control mb-4"
            type="password"
            placeholder="Confirmar contraseña"
            name="passwordConfirm"
            autoComplete='off'
            value={passwordConfirm}
            onChange={handleInputChange}
          />

          <button type='submit' className="primary-button">
            Nueva contraseña
          </button>
        </form>

      </div>
    </div>
  );
};

export default RestorePasswordScreen;