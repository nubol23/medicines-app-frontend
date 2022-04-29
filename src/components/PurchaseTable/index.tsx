import React, { FC, useContext, useState } from "react";
import { PurchaseContext } from "../../contexts/purchaseContext";
import LoadingCircle from "../LoadingCircle";
import useRequest from "../../hooks/useRequest";
import api from "../../apis/api";
import purchaseTypes from "../../types/purchaseTypes";
import { formatDate } from "../../utils/functions";
import "./purchaseTable.scss";
import { useNavigate } from "react-router-dom";
import deleteDialog from "../../utils/deleteDialog";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../auth/authContext";
import authTypes from "../../types/authTypes";
import Paginator from "../Paginator";
import { AxiosError, AxiosResponse } from "axios";
import { PaginatedResponse, Purchase } from "../../types/objectTypes";
import { PaginatorParams } from "../../types/PaginatorParams";

type Props = {
  paginatorParams: PaginatorParams;
  setPaginatorParams: (params: PaginatorParams) => void;
};

const PurchaseTable: FC<Props> = ({ paginatorParams, setPaginatorParams }) => {
  const { purchases, purchasesDispatch } = useContext(PurchaseContext);
  const { userDispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useRequest(
    () => api.get("/medicines/purchase"),
    (response: AxiosResponse<PaginatedResponse<Purchase>>) => {
      purchasesDispatch({ type: purchaseTypes.clear });
      response.data.results.map((purchase) =>
        purchasesDispatch({ type: purchaseTypes.add, payload: purchase })
      );

      setLoading(false);
      setPaginatorParams({
        ...paginatorParams,
        totalCount: response.data.count,
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
      });
    },
    (error: AxiosError) => {
      toast.error("Error al cargar las medicinas");
    }
  );

  const navigate = useNavigate();

  const handleEditPurchase = (purchaseId: string, medicineId: string) => {
    navigate(`/purchases/${medicineId}/update/${purchaseId}`);
  };

  const handleDeletePurchase = (
    purchaseId: string,
    medicineName: string,
    familyName: string
  ) => {
    deleteDialog(() => {
      api
        .delete(`/medicines/purchase/${purchaseId}`)
        .then((response) => {
          purchasesDispatch({
            type: purchaseTypes.remove,
            payload: { id: purchaseId },
          });

          toast.success("Compra eliminada correctamente");
        })
        .catch((error) => {
          // If returned 401
          if (error.response && error.response.status === 401) {
            userDispatch({ type: authTypes.logout });
            toast.error("Sesión expirada");
          } else {
            toast.error("Error al eliminar la compra");
          }
        });
    }, `¿Está seguro/a que desea eliminar la compra de ${medicineName} para la familia ${familyName}?`);
  };

  return loading ? (
    <LoadingCircle />
  ) : (
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
              <th />
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr
                key={purchase.id}
                className="animate__animated animate__fadeIn"
              >
                <td onClick={() => {}}>
                  {purchase.medicine!.name} - {purchase.medicine!.maker}:{" "}
                  {purchase.medicine!.quantity} {purchase.medicine!.unit}
                </td>
                <td onClick={() => {}}>{purchase.family!.family_name}</td>
                <td onClick={() => {}}>
                  {formatDate(purchase.expiration_date!)}
                </td>
                <td onClick={() => {}}>{purchase.units}</td>
                <td onClick={() => {}}>{purchase.consumed ? "SI" : "NO"}</td>
                <td>
                  <button
                    className="edit-row-button"
                    onClick={() =>
                      handleEditPurchase(purchase.id!, purchase.medicine!.id!)
                    }
                  >
                    <i className="material-icons">edit</i>
                  </button>
                  <button
                    className="delete-row-button"
                    onClick={() =>
                      handleDeletePurchase(
                        purchase.id!,
                        purchase.medicine!.name!,
                        purchase.family!.family_name!
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
        dispatch={purchasesDispatch}
        actionType={purchaseTypes}
      />
    </div>
  );
};

export default PurchaseTable;
