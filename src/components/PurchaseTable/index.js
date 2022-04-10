import React, {useContext, useState} from 'react';
import {PurchaseContext} from "../../contexts/purchaseContext";
import LoadingCircle from "../LoadingCircle";

const PurchaseTable = () => {

  const {purchases, purchasesDispatch} = useContext(PurchaseContext);
  const [loading, setLoading] = useState(true)

  const handleTableClick = (purchaseId) => {

  }

  const handleEditPurchase = (purchaseId) => {

  }

  const handleDeletePurchase = (purchaseId) => {

  }

  return loading ? <LoadingCircle/> : (
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
          {
            purchases.map(purchase => (
              <tr key={purchase.id} className="animate__animated animate__fadeIn">
                <td onClick={() => handleTableClick(purchase.id)}>AAA</td>
                <td>
                  <button
                    className="edit-row-button"
                    onClick={() => handleEditPurchase(purchase.id)}
                  ><i className="material-icons">edit</i></button>
                  <button
                    className="delete-row-button"
                    onClick={() => handleDeletePurchase(purchase.id)}
                  ><i className="material-icons">delete</i></button>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default PurchaseTable;