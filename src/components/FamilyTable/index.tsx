import React, { useContext, useState } from "react";
import { FamilyContext } from "../../contexts/familyContext";
import { useNavigate } from "react-router-dom";
import "./familyTable.scss";
import api from "../../apis/api";
import familyTypes from "../../types/familyTypes";
import authTypes from "../../types/authTypes";
import { AuthContext } from "../../auth/authContext";
import deleteDialog from "../../utils/deleteDialog";
import { toast } from "react-hot-toast";
import useRequest from "../../hooks/useRequest";
import LoadingCircle from "../LoadingCircle";
import Paginator from "../Paginator";
import { PaginatorParams } from "../../types/PaginatorParams";
import { AxiosError, AxiosResponse } from "axios";
import { Family, PaginatedResponse } from "../../types/objectTypes";

const FamilyTable = () => {
  const [paginatorParams, setPaginatorParams] = useState<PaginatorParams>({
    baseUrl: "/families/",
    totalCount: 0,
    nextUrl: null,
    prevUrl: null,
  });

  const [loading, setLoading] = useState(true);
  const { families, familiesDispatch } = useContext(FamilyContext);
  const { userDispatch } = useContext(AuthContext);

  useRequest(
    () => api.get("/families/"),
    (response: AxiosResponse<PaginatedResponse<Family>>) => {
      familiesDispatch({ type: familyTypes.clear });

      response.data.results.map((family) =>
        familiesDispatch({ type: familyTypes.add, payload: family })
      );

      setLoading(false);

      setPaginatorParams({
        ...paginatorParams,
        totalCount: response.data.pages,
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
      });
    },
    (error: AxiosError) => {}
  );

  const navigate = useNavigate();
  const handleTableClick = (id: string) => {
    navigate(`/families/${id}`);
  };

  const handleDeleteFamily = (id: string, family_name: string) => {
    deleteDialog(() => {
      api
        .delete(`/families/${id}`)
        .then((response) => {
          familiesDispatch({
            type: familyTypes.remove,
            payload: { id },
          });

          toast.success("Familia eliminada correctamente");
        })
        .catch((error) => {
          // If returned 401
          if (error.response && error.response.status === 401) {
            userDispatch({ type: authTypes.logout });
            toast.error("Sesión expirada");
          } else {
            toast.error("Error al eliminar familia");
          }
        });
    }, `¿Está seguro/a que desea eliminar la familia ${family_name}?`);
  };

  return loading ? (
    <LoadingCircle />
  ) : (
    <div>
      <table className="table table-hover family-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre de Familia</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {families.map((family) => (
            <tr key={family.id} className="animate__animated animate__fadeIn">
              <td onClick={() => handleTableClick(family.id!)}>{family.id}</td>
              <td onClick={() => handleTableClick(family.id!)}>
                {family.family_name}
              </td>
              <td>
                <button
                  className="delete-row-button"
                  onClick={() =>
                    handleDeleteFamily(family.id!, family.family_name!)
                  }
                >
                  <i className="material-icons">delete</i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Paginator
        params={paginatorParams}
        setParams={setPaginatorParams}
        dispatch={familiesDispatch}
        actionType={familyTypes}
      />
    </div>
  );
};

export default FamilyTable;
