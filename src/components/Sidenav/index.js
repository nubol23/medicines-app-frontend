import React, { useContext } from "react";
import "./sidenav.scss";
import { NavLink } from "react-router-dom";
import { FamilyContext } from "../../contexts/familyContext";

const Sidenav = () => {
  const { families } = useContext(FamilyContext);

  return (
    <div className="flex-shrink-0 p-3 app-sidenav">
      <ul className="list-unstyled ps-0">
        <li className="mb-1">
          <button
            className="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#home-collapse"
            aria-expanded="true"
          >
            Families
          </button>
          <div className="collapse show" id="home-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <NavLink
                  className={({ isActive }) => "link-dark rounded"}
                  to="/family"
                >
                  List
                </NavLink>
              </li>
              {families.map((family) => (
                <li key={family.id}>
                  <NavLink
                    className={({ isActive }) => "link-dark rounded"}
                    to={`/family/${family.id}`}
                  >
                    {family.family_name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </li>

        <li className="mb-1">
          <button
            className="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#dashboard-collapse"
            aria-expanded="false"
          >
            Dashboard
          </button>
          <div className="collapse" id="dashboard-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a href="#" className="link-dark rounded">
                  Overview
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Weekly
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Monthly
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Annually
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidenav;
