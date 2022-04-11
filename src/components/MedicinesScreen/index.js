import React, {useContext, useState} from 'react';
import useForm from "../../hooks/useForm";
import "./medicines.scss"
import {useNavigate} from "react-router-dom";
import MedicineTable from "../MedicineTable";
import api from "../../apis/api";
import {MedicineContext} from "../../contexts/medicineContext";
import medicineTypes from "../../types/medicineTypes";
import {toast} from "react-hot-toast";

const MedicinesScreen = () => {

  const [paginatorParams, setPaginatorParams] = useState({
    baseUrl: "/medicines/medicines/",
    totalCount: 0,
    nextUrl: null,
    prevUrl: null,
  })

  const navigate = useNavigate();
  const [{medicineName}, handleInputChange, reset] = useForm({medicineName: '',})
  const {medicinesDispatch} = useContext(MedicineContext);

  const handleSearchMedicine = (e) => {
    e.preventDefault();

    let searchParams = {}

    if (medicineName !== "") searchParams = {...searchParams, name: medicineName}

    api.get("/medicines/medicines/", {params: searchParams})
      .then((response) => {
        medicinesDispatch({type: medicineTypes.clear});
        medicinesDispatch({
          type: medicineTypes.addMultiple,
          payload: response.data.results,
        });

        setPaginatorParams({
          ...paginatorParams,
          totalCount: response.data.count,
          nextUrl: response.data.next,
          prevUrl: response.data.previous,
        })

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

      <MedicineTable paginatorParams={paginatorParams} setPaginatorParams={setPaginatorParams}/>
    </div>
  );
};

export default MedicinesScreen;