import React, {useContext} from 'react';
import {FamilyContext} from "../../contexts/familyContext";
import {useNavigate} from "react-router-dom";
import "./familyTable.scss"
import api from "../../apis/api";
import familyTypes from "../../types/familyTypes";
import authTypes from "../../types/authTypes";
import {AuthContext} from "../../auth/authContext";
import deleteDialog from "../../utils/deleteDialog";
import {toast} from "react-hot-toast";

const FamilyTable = () => {
  const {families, familiesDispatch} = useContext(FamilyContext);
  const {userDispatch} = useContext(AuthContext);

  const navigate = useNavigate()
  const handleTableClick = (id) => {
    navigate(`/family/${id}`)
  }

  const handleDeleteFamily = (id, family_name) => {

    deleteDialog(() => {
      api.delete(`/families/${id}`)
        .then((response) => {
          familiesDispatch({
            type: familyTypes.removeFamily,
            payload: {id},
          })

          toast.success("Familia eliminada correctamente")
        })
        .catch((error) => {
          // If returned 401
          if (error.response && error.response.status === 401) {
            userDispatch({type: authTypes.logout});
            toast.error("Sesión expirada")
          } else {
            toast.error("Error al eliminar familia")
          }
        })
    }, `¿Está seguro/a que desea eliminar la familia ${family_name}?`)

  }

  return (
    <table className="table table-hover family-table">
      <thead>
      <tr>
        <th>Id</th>
        <th>Nombre de Familia</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {
        families.map(family => (
          <tr key={family.id} className="animate__animated animate__fadeIn">
            <td onClick={() => handleTableClick(family.id)}>{family.id}</td>
            <td onClick={() => handleTableClick(family.id)}>{family.family_name}</td>
            <td>
              <button
                className="delete-row-button"
                onClick={() => handleDeleteFamily(family.id, family.family_name)}
              >x
              </button>
            </td>
          </tr>
        ))
      }
      </tbody>
    </table>
  );
};

export default FamilyTable;