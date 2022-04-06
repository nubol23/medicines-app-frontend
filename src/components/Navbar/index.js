import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../auth/authContext";
import authTypes from "../../types/authTypes";
import "./navbar.scss"
import {FamilyContext} from "../../contexts/familyContext";
import familyTypes from "../../types/familyTypes";

const Navbar = () => {
  const navigate = useNavigate();

  const {userDispatch} = useContext(AuthContext);
  const {familiesDispatch} = useContext(FamilyContext);

  const handleLogout = () => {
    userDispatch({type: authTypes.logout})
    familiesDispatch({type: familyTypes.clear})

    navigate('/login', {replace: true});
  }

  return (
    <div className="app-header">

      <div className="header-tabs">
        <h3 className="header-name">Medicines</h3>
        <button className="tab-button">Familias</button>
        <button className="tab-button">Medicamentos</button>
        <button className="tab-button">Compras</button>
      </div>

      <button onClick={handleLogout} type="button" className="secondary-button">
        Logout
      </button>
    </div>
  );
};

export default Navbar;