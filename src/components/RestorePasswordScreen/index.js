import React from 'react';
import useForm from "../../hooks/useForm";
import {useParams} from "react-router-dom";
import {toast} from "react-hot-toast";

const Index = () => {

  const {requestId} = useParams();

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

export default Index;