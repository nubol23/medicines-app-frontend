import React from 'react';
import useForm from "../../hooks/useForm";
import "./medicines.scss"

const MedicinesScreen = () => {

  const [{medicineName}, handleInputChange, reset] = useForm({medicineName: '',})

  const handleSearchMedicine = (e) => {
    e.preventDefault();

  }

  return (
    <div>
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
          <button className="create-family-button">Crear</button>
        </div>
      </div>
    </div>
  );
};

export default MedicinesScreen;