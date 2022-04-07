import React from 'react';
import useForm from "../../hooks/useForm";
import "./medicines.scss"
import {useNavigate} from "react-router-dom";
import MedicineTable from "../MedicineTable";

const MedicinesScreen = () => {

  const navigate = useNavigate();
  const [{medicineName}, handleInputChange, reset] = useForm({medicineName: '',})

  const handleSearchMedicine = (e) => {
    e.preventDefault();

  }

  const handleCreateMedicine = () => {
    navigate("/medicines/create")
  }

  return (
    <div className="medicine-screen animate__animated animate__fadeIn">
      <div className="medicines-buttons">
        <form className="search-medicine-form" onSubmit={handleSearchMedicine}>
          <input
            className="form-control"
            type="text"
            placeholder="Medicamento"
            name="medicineName"
            value={medicineName}
            onChange={handleInputChange}
          />

          <button type="submit" className="create-family-button">Buscar</button>
        </form>

        <div>
          <button className="create-family-button" onClick={handleCreateMedicine}>Crear</button>
        </div>
      </div>

      <MedicineTable/>
    </div>
  );
};

export default MedicinesScreen;