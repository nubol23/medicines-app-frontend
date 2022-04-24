import React, { useContext, useState } from "react";
import "./medicineTable.scss";
import { MedicineContext } from "../../contexts/medicineContext";
import useRequest from "../../hooks/useRequest";
import api from "../../apis/api";
import medicineTypes from "../../types/medicineTypes";
import deleteDialog from "../../utils/deleteDialog";
import { toast } from "react-hot-toast";
import authTypes from "../../types/authTypes";
import { AuthContext } from "../../auth/authContext";
import { useNavigate } from "react-router-dom";
import LoadingCircle from "../LoadingCircle";
import Paginator from "../Paginator";

const MedicineTable = ({ paginatorParams, setPaginatorParams }) => {
  const [loading, setLoading] = useState(true);
  const { medicines, medicinesDispatch } = useContext(MedicineContext);
  const { userDispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useRequest(
    () => api.get("/medicines/medicines/"),
    (response) => {
      medicinesDispatch({ type: medicineTypes.clear });
      medicinesDispatch({
        type: medicineTypes.addMultiple,
        payload: response.data.results,
      });
      setLoading(false);
      setPaginatorParams({
        ...paginatorParams,
        totalCount: response.data.count,
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
      });
    },
    (error) => {}
  );

  const handleTableClick = (id) => {
    navigate(`/purchases/${id}/create`);
  };

  const handleEditMedicine = (id) => {
    navigate(`/medicines/update/${id}`);
  };

  const handleDeleteMedicine = (id, name, cant, unit) => {
    deleteDialog(() => {
      api
        .delete(`/medicines/medicines/${id}`)
        .then((response) => {
          medicinesDispatch({
            type: medicineTypes.remove,
            payload: { id },
          });

          toast.success("Medicina eliminada correctamente");
        })
        .catch((error) => {
          // If returned 401
          if (error.response && error.response.status === 401) {
            userDispatch({ type: authTypes.logout });
            toast.error("Sesión expirada");
          } else {
            toast.error("Error al eliminar medicina");
          }
        });
    }, `¿Está seguro/a que desea eliminar ${name} ${cant} ${unit}?`);
  };

  return loading ? (
    <LoadingCircle />
  ) : (
    <div>
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
            {medicines.map((medicine) => (
              <tr
                key={medicine.id}
                className="animate__animated animate__fadeIn"
              >
                <td onClick={() => handleTableClick(medicine.id)}>
                  {medicine.name}
                </td>
                <td onClick={() => handleTableClick(medicine.id)}>
                  {medicine.maker}
                </td>
                <td onClick={() => handleTableClick(medicine.id)}>
                  {Math.round(medicine.quantity)}
                </td>
                <td onClick={() => handleTableClick(medicine.id)}>
                  {medicine.unit}
                </td>
                <td>
                  <button
                    className="edit-row-button"
                    onClick={() => handleEditMedicine(medicine.id)}
                  >
                    <i className="material-icons">edit</i>
                  </button>
                  <button
                    className="delete-row-button"
                    onClick={() =>
                      handleDeleteMedicine(
                        medicine.id,
                        medicine.name,
                        medicine.quantity,
                        medicine.unit
                      )
                    }
                  >
                    <i className="material-icons">delete</i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Paginator
        params={paginatorParams}
        setParams={setPaginatorParams}
        dispatch={medicinesDispatch}
        actionType={medicineTypes}
      />
    </div>
  );
};

export default MedicineTable;
