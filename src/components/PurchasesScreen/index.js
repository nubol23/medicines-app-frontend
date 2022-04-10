import React from 'react';
import useForm from "../../hooks/useForm";
import "./purchases.scss"
import PurchaseTable from "../PurchaseTable";

const PurchasesScreen = () => {

  const [{medicineName}, handleInputChange] = useForm({medicineName: '',})

  const handleSearchByMedicine = (e) => {
    e.preventDefault();

  }

  return (
    <div className="medicine-screen animate__animated animate__fadeIn">

      <div className="medicines-buttons">
        <form className="search-purchases-form" onSubmit={handleSearchByMedicine}>
          <input
            className="form-control"
            type="text"
            placeholder="Buscar por medicamento"
            name="medicineName"
            value={medicineName}
            onChange={handleInputChange}
          />

          <button type="submit" className="create-family-button">Buscar</button>
        </form>
      </div>

      <PurchaseTable/>
    </div>
  );
};

export default PurchasesScreen;