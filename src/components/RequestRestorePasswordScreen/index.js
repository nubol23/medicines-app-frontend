import React from 'react';
import useForm from "../../hooks/useForm";

const RequestRestorePasswordScreen = () => {

  const [{email}, handleInputChange] = useForm({email: ''})

  const handleRequestRestore = (e) => {
    e.preventDefault();
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