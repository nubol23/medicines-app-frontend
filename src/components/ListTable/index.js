import React, {useContext} from 'react';
import {FamilyContext} from "../../contexts/familyContext";
import {useNavigate} from "react-router-dom";

const ListTable = () => {
  const {families} = useContext(FamilyContext);

  const navigate = useNavigate()
  const handleTableClick = (id) => {
    navigate(`/family/${id}`)
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
              <button className="delete-row-button">x</button>
            </td>
          </tr>
        ))
      }
      </tbody>
    </table>
  );
};

export default ListTable;