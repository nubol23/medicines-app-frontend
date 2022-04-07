import React, {useContext} from 'react';
import "./medicineTable.scss"
import {MedicineContext} from "../../contexts/medicineContext";
import useRequest from "../../hooks/useRequest";
import api from "../../apis/api";
import medicineTypes from "../../types/medicineTypes";

const MedicineTable = () => {

  const {medicines, medicinesDispatch} = useContext(MedicineContext);

  useRequest(
    api.get("/medicines/medicines/"),
    (response) => {
      medicinesDispatch({type: medicineTypes.clear});
      medicinesDispatch({
        type: medicineTypes.addMultiple,
        payload: response.data.results,
      });
    },
    (error) => {
    },
  )

  const handleTableClick = (id) => {

  }

  const handleEditMedicine = (id) => {

  }

  const handleDeleteMedicine = (id) => {

  }

  return (
    <div className="medicine-table">
      <table className="table table-hover">
        <thead>
        <tr>
          <th>Nombre</th>
          <th>Fabricante</th>
          <th>Cant.</th>
          <th>U.</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {
          medicines.map(medicine => (
            <tr key={medicine.id} className="animate__animated animate__fadeIn">
              <td onClick={() => handleTableClick(medicine.id)}>{medicine.name}</td>
              <td onClick={() => handleTableClick(medicine.id)}>{medicine.maker}</td>
              <td onClick={() => handleTableClick(medicine.id)}>{Math.round(medicine.quantity)}</td>
              <td onClick={() => handleTableClick(medicine.id)}>{medicine.unit}</td>
              <td>
                <button
                  className="edit-row-button"
                  onClick={() => handleEditMedicine(medicine.id)}
                ><i className="fas fa-pen"/></button>
                <button
                  className="delete-row-button"
                  onClick={() => handleDeleteMedicine(medicine.id)}
                ><i className="fas fa-trash"/></button>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
};

export default MedicineTable;