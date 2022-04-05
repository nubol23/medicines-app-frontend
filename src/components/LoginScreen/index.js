import jwtDecode from 'jwt-decode';
import React, {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import authApi from '../../apis/authApi'
import {AuthContext} from '../../auth/authContext';
import useForm from '../../hooks/useForm'
import authTypes from '../../types/authTypes';
import "./login.scss"

export const LoginScreen = () => {

  const {userDispatch} = useContext(AuthContext);

  const [message, setMessage] = useState('');

  const [{email, password}, handleInputChange] = useForm({
    email: '',
    password: '',
  })

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "" || password === "") return;

    authApi.post("users/token/", {
      email,
      password,
    }).then((response) => {

      const decoded = jwtDecode(response.data.access)
      const payload = {
        accessToken: response.data.access,
        refreshToken: response.data.refresh,
        issuedAt: decoded.iat,
        expiresAt: decoded.exp,
        userId: decoded.user_id,
        firstName: decoded.first,
        email: decoded.email,
      }

      setMessage('')

      userDispatch({type: authTypes.login, payload});

      navigate('/', {replace: true});
    }).catch((error) => {
      setMessage(msg => "Error al autenticar")
    })
  }

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
            autoComplete='off'
            value={password}
            onChange={handleInputChange}
          />

          {/*<button type='submit' className="btn btn-primary btn-block">*/}
          <button type='submit' className="primary-button">
            Login
          </button>

          <br/>
          {
            (message !== '') && <p>{message}</p>
          }
        </form>

      </div>
    </div>
  )
}