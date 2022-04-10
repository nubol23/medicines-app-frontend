import React, {useContext, useEffect, useState} from 'react';
import {PurchaseContext} from "../../contexts/purchaseContext";
import LoadingCircle from "../LoadingCircle";
import useRequest from "../../hooks/useRequest";
import api from "../../apis/api";
import purchaseTypes from "../../types/purchaseTypes";
import {formatDate} from "../../utils/functions";
import "./purchaseTable.scss"
import {useNavigate} from "react-router-dom";

const PurchaseTable = ({familyId}) => {

  const {purchases, purchasesDispatch} = useContext(PurchaseContext);
  const [loading, setLoading] = useState(true)

  useRequest(
    () => api.get("/medicines/purchase"),
    (response) => {
      purchasesDispatch({type: purchaseTypes.clear});
      purchasesDispatch({
        type: purchaseTypes.addMultiple,
        payload: response.data.results,
      });
      setLoading(false)
      // setPaginatorParams({
      //   ...paginatorParams,
      //   totalCount: response.data.count,
      //   nextUrl: response.data.next,
      //   prevUrl: response.data.previous,
      // })
    },
    (error) => {
    },
  )

  useEffect(() => {
    api.get("/medicines/purchase", {params: {family_ids: familyId}})
      .then((response) => {
        purchasesDispatch({type: purchaseTypes.clear});
        purchasesDispatch({
          type: purchaseTypes.addMultiple,
          payload: response.data.results,
        });
      })
  }, [familyId])

  const navigate = useNavigate();

  const handleTableClick = (purchaseId) => {

  }

  const handleEditPurchase = (purchaseId, medicineId) => {
    navigate(`/purchases/${medicineId}/update/${purchaseId}`)
  }

  const handleDeletePurchase = (purchaseId) => {

  }

  return loading ? <LoadingCircle/> : (
    <div>

      <div className="purchase-table">
        <table className="table table-hover">
          <thead>
          <tr>
            <th>Medicina</th>
            <th>Familia</th>
            <th>Expiración</th>
            <th>U.</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {
            purchases.map(purchase => (
              <tr key={purchase.id} className="animate__animated animate__fadeIn">
                <td onClick={() => handleTableClick(purchase.id)}>
                  {purchase.medicine.name} - {purchase.medicine.maker}: {purchase.medicine.quantity} {purchase.medicine.unit}
                </td>
                <td onClick={() => handleTableClick(purchase.id)}>{purchase.family.family_name}</td>
                <td onClick={() => handleTableClick(purchase.id)}>{formatDate(purchase.buy_date)}</td>
                <td onClick={() => handleTableClick(purchase.id)}>{purchase.units}</td>
                <td>
                  <button
                    className="edit-row-button"
                    onClick={() => handleEditPurchase(purchase.id, purchase.medicine.id)}
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