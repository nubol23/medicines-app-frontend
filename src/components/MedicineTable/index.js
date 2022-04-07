import React from 'react';
import "./medicineTable.scss"

const MedicineTable = () => {
  return (
    <div className="medicine-table">
      <table className="table table-hover">
        <thead>
        <tr>
          <th>Nombre</th>
          <th>Fabricante</th>
          <th>Cantidad</th>
          <th>Unidad</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {/*{*/}
        {/*  families.map(family => (*/}
        {/*    <tr key={family.id} className="animate__animated animate__fadeIn">*/}
        {/*      <td onClick={() => handleTableClick(family.id)}>{family.id}</td>*/}
        {/*      <td onClick={() => handleTableClick(family.id)}>{family.family_name}</td>*/}
        {/*      <td>*/}
        {/*        <button*/}
        {/*          className="delete-row-button"*/}
        {/*          onClick={() => handleDeleteFamily(family.id, family.family_name)}*/}
        {/*        >x*/}
        {/*        </button>*/}
        {/*      </td>*/}
        {/*    </tr>*/}
        {/*  ))*/}
        {/*}*/}
        </tbody>
      </table>
    </div>
  );
};

export default MedicineTable;