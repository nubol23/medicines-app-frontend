import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../auth/authContext";
import authTypes from "../../types/authTypes";
import "./navbar.scss"

const Navbar = () => {
  const navigate = useNavigate();

  const {userDispatch} = useContext(AuthContext);

  const handleLogout = () => {
    userDispatch({type: authTypes.logout})

    navigate('/login', {replace: true});
  }

  return (
    <div className="app-header">
      <h3>Medicines App</h3>

      <button onClick={handleLogout} type="button" className="primary-button">
        Logout
      </button>
    </div>
  );
};

export default Navbar;