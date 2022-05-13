import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import authTypes from "../../../types/authTypes";
import "./navbar.scss";
import { FamilyContext } from "../../../contexts/familyContext";
import familyTypes from "../../../types/familyTypes";

const activeTabButton = ({ isActive }: { isActive: boolean }) =>
  "tab-button" + (isActive ? " tab-button-active" : "");

const Navbar = () => {
  const navigate = useNavigate();

  const { user, userDispatch } = useContext(AuthContext);
  const { familiesDispatch } = useContext(FamilyContext);

  const handleLogout = () => {
    userDispatch({ type: authTypes.logout });
    familiesDispatch({ type: familyTypes.clear });

    navigate("/login", { replace: true });
  };

  return (
    <div className="app-header animate__animated animate__fadeInDown">
      <div className="header-tabs">
        <h3 className="header-name">Medicines</h3>

        <NavLink to="/families" className={activeTabButton}>
          Familias
        </NavLink>

        <NavLink to="/medicines" className={activeTabButton}>
          Medicamentos
        </NavLink>

        <NavLink to="/purchases" className={activeTabButton}>
          Compras
        </NavLink>
      </div>

      <div>
        <NavLink to={`/profile/${user.userId}`} className={activeTabButton}>
          ({user.firstName})
        </NavLink>
        <button onClick={handleLogout} type="button" className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
