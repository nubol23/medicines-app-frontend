import React, {useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../auth/authContext'
import authTypes from '../../types/authTypes';

export const HomeScreen = () => {

  const navigate = useNavigate();

  const {userDispatch} = useContext(AuthContext);

  const handleLogout = () => {
    userDispatch({type: authTypes.logout})

    navigate('/login', {replace: true});
  }

  return (
    <div>
      
      <div>
        <h3>HomeScreen</h3>
        <br/>
        <button onClick={handleLogout} type="button">
          Logout
        </button>
      </div>

    </div>
  )
}
