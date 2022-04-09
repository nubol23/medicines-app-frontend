import React, {useContext} from 'react';
import useForm from "../../hooks/useForm";
import "./medicines.scss"
import {useNavigate} from "react-router-dom";
import MedicineTable from "../MedicineTable";
import api from "../../apis/api";
import {emptyObj} from "../../utils/functions";
import {MedicineContext} from "../../contexts/medicineContext";
import medicineTypes from "../../types/medicineTypes";
import {toast} from "react-hot-toast";

const MedicinesScreen = () => {

  const navigate = useNavigate();
  const [{medicineName}, handleInputChange, reset] = useForm({medicineName: '',})
  const {medicinesDispatch} = useContext(MedicineContext);

  const handleSearchMedicine = (e) => {
    e.preventDefault();

    let searchParams = {}

    if (medicineName !== "") searchParams = {...searchParams, name: medicineName}

    let req = null
    if (emptyObj(searchParams)) {
      req = api.get("/medicines/medicines/")
    } else {
      req = api.get("/medicines/medicines/", {params: searchParams})
    }

    req.then((response) => {
      medicinesDispatch({type: medicineTypes.clear});
      medicinesDispatch({
        type: medicineTypes.addMultiple,
        payload: response.data.results,
      });
    }).catch((error) => toast.error("Error al buscar"))
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