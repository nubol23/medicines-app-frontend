import React, { useContext, useState } from "react";
import useForm from "../../hooks/useForm";
import "./medicines.scss";
import { useNavigate } from "react-router-dom";
import MedicineTable from "../../components/MedicineTable";
import api from "../../apis/api";
import { MedicineContext } from "../../contexts/medicineContext";
import medicineTypes from "../../types/medicineTypes";
import { toast } from "react-hot-toast";
import { PaginatorParams } from "../../types/PaginatorParams";
import { AxiosResponse } from "axios";
import { Medicine, PaginatedResponse } from "../../types/objectTypes";

const MedicinesScreen = () => {
  const [paginatorParams, setPaginatorParams] = useState<PaginatorParams>({
    baseUrl: "/medicines/medicines/",
    totalCount: 0,
    nextUrl: null,
    prevUrl: null,
  });

  const navigate = useNavigate();
  const [{ medicineName }, handleInputChange] = useForm({
    medicineName: "",
  });
  const { medicinesDispatch } = useContext(MedicineContext);

  const handleSearchMedicine = (e: React.FormEvent) => {
    e.preventDefault();

    let searchParams = {};

    if (medicineName !== "")
      searchParams = { ...searchParams, name: medicineName };

    api
      .get("/medicines/medicines/", { params: searchParams })
      .then((response: AxiosResponse<PaginatedResponse<Medicine>>) => {
        medicinesDispatch({ type: medicineTypes.clear });
        response.data.results.map((medicine) =>
          medicinesDispatch({ type: medicineTypes.add, payload: medicine })
        );

        setPaginatorParams({
          ...paginatorParams,
          totalCount: response.data.pages,
          nextUrl: response.data.next,
          prevUrl: response.data.previous,
        });
      })
      .catch((error) => toast.error("Error al buscar"));
  };

  const handleCreateMedicine = () => {
    navigate("/medicines/create");
  };

  return (
    <div className="medicine-screen animate__animated animate__fadeIn animate__faster">
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

          <button type="submit" className="create-family-button">
            Buscar
          </button>
        </form>

        <div>
          <button
            className="create-family-button"
            onClick={handleCreateMedicine}
          >
            Crear
          </button>
        </div>
      </div>

      <MedicineTable
        paginatorParams={paginatorParams}
        setPaginatorParams={setPaginatorParams}
      />
    </div>
  );
};

export default MedicinesScreen;
