import React, {useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../auth/authContext'
import authTypes from '../../types/authTypes';
import './home.scss'
import Sidenav from "../Sidenav";

export const HomeScreen = () => {

  const navigate = useNavigate();

  const {userDispatch} = useContext(AuthContext);

  const handleLogout = () => {
    userDispatch({type: authTypes.logout})

    navigate('/login', {replace: true});
  }

  return (
    <div className="home-box">

      <Sidenav/>

      <div className="home-content">

        <div className="home-header">
          <h3>HomeScreen</h3>

          <button onClick={handleLogout} type="button" className="primary-button">
            Logout
          </button>
        </div>

      </div>

    </div>
  )
}
