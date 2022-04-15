import React, {useContext, useEffect, useState} from 'react';
import {PurchaseContext} from "../../contexts/purchaseContext";
import LoadingCircle from "../LoadingCircle";
import useRequest from "../../hooks/useRequest";
import api from "../../apis/api";
import purchaseTypes from "../../types/purchaseTypes";
import {formatDate} from "../../utils/functions";
import "./purchaseTable.scss"
import {useNavigate} from "react-router-dom";
import deleteDialog from "../../utils/deleteDialog";
import {toast} from "react-hot-toast";
import {AuthContext} from "../../auth/authContext";
import authTypes from "../../types/authTypes";
import Paginator from "../Paginator";

const PurchaseTable = ({familyId, filterByUser, paginatorParams, setPaginatorParams}) => {

  const {purchases, purchasesDispatch} = useContext(PurchaseContext);
  const {userDispatch} = useContext(AuthContext);
  const [loading, setLoading] = useState(true)

  useRequest(
    () => api.get("/medicines/purchase"),
    (response) => {
      console.log(response.data.results)
      purchasesDispatch({type: purchaseTypes.clear});
      purchasesDispatch({
        type: purchaseTypes.addMultiple,
        payload: response.data.results,
      });
      setLoading(false)
      setPaginatorParams({
        ...paginatorParams,
        totalCount: response.data.count,
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
      })
    },
    (error) => {
    },
  )

  useEffect(() => {
    api.get("/medicines/purchase", {params: {family_ids: familyId, filter_by_user: filterByUser}})
      .then((response) => {
        purchasesDispatch({type: purchaseTypes.clear});
        purchasesDispatch({
          type: purchaseTypes.addMultiple,
          payload: response.data.results,
        });

        setPaginatorParams({
          ...paginatorParams,
          totalCount: response.data.count,
          nextUrl: response.data.next,
          prevUrl: response.data.previous,
        })
      })
  }, [familyId, filterByUser])

  const navigate = useNavigate();

  const handleTableClick = (purchaseId) => {

  }

  const handleEditPurchase = (purchaseId, medicineId) => {
    navigate(`/purchases/${medicineId}/update/${purchaseId}`)
  }

  const handleDeletePurchase = (purchaseId, medicineName, familyName) => {
    deleteDialog(() => {
      api.delete(`/medicines/purchase/${purchaseId}`)
        .then((response) => {
          purchasesDispatch({
            type: purchaseTypes.remove,
            payload: {id: purchaseId},
          })

          toast.success("Compra eliminada correctamente")
        })
        .catch((error) => {
          // If returned 401
          if (error.response && error.response.status === 401) {
            userDispatch({type: authTypes.logout});
            toast.error("Sesión expirada")
          } else {
            toast.error("Error al eliminar la compra")
          }
        })
    }, `¿Está seguro/a que desea eliminar la compra de ${medicineName} para la familia ${familyName}?`)
  }

  return loading ? <LoadingCircle/> : (
    <div>

      <div className="purchase-table">
        <table className="table table-hover">
          <thead>
          <tr>
            <th>Medicina</th>
            <th>Fam</th>
            <th>Exp</th>
            <th>U.</th>
            <th>Fin</th>
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
                <td onClick={() => handleTableClick(purchase.id)}>{formatDate(purchase.expiration_date)}</td>
                <td onClick={() => handleTableClick(purchase.id)}>{purchase.units}</td>
                <td onClick={() => handleTableClick(purchase.id)}>{purchase.consumed ? "SI" : "NO"}</td>
                <td>
                  <button
                    className="edit-row-button"
                    onClick={() => handleEditPurchase(purchase.id, purchase.medicine.id)}
                  ><i className="material-icons">edit</i></button>
                  <button
                    className="delete-row-button"
                    onClick={() => handleDeletePurchase(purchase.id, purchase.medicine.name, purchase.family.family_name)}
                  ><i className="material-icons">delete</i></button>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>

      <Paginator
        params={paginatorParams}
        setParams={setPaginatorParams}
        dispatch={purchasesDispatch}
        actionType={purchaseTypes}
      />
    </div>
  );
};

export default PurchaseTable;