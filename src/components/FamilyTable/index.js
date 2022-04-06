import React, {useContext} from 'react';
import {FamilyContext} from "../../contexts/familyContext";
import {useNavigate} from "react-router-dom";
import "./familyTable.scss"
import api from "../../apis/api";
import familyTypes from "../../types/familyTypes";
import authTypes from "../../types/authTypes";
import {AuthContext} from "../../auth/authContext";

const FamilyTable = () => {
  const {families, familiesDispatch} = useContext(FamilyContext);
  const {userDispatch} = useContext(AuthContext);

  const navigate = useNavigate()
  const handleTableClick = (id) => {
    navigate(`/family/${id}`)
  }

  const handleDeleteFamily = (id) => {
    api.delete(`/families/${id}`)
      .then((response) => {
        familiesDispatch({
          type: familyTypes.removeFamily,
          payload: {id},
        })
      })
      .catch((error) => {

        console.log("Error deleting")

        // If returned 401
        if (error.response && error.response.status === 401)
          userDispatch({type: authTypes.logout});
      })
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
          <tr key={family.id}>
            <td onClick={() => handleTableClick(family.id)}>{family.id}</td>
            <td onClick={() => handleTableClick(family.id)}>{family.family_name}</td>
            <td>
              <button
                className="delete-row-button"
                onClick={() => handleDeleteFamily(family.id)}
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