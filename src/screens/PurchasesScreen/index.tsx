import React, { useContext, useState } from "react";
import useForm from "../../hooks/useForm";
import "./purchases.scss";
import PurchaseTable from "../../components/PurchaseTable";
import useRequest from "../../hooks/useRequest";
import api from "../../apis/api";
import { PurchaseContext } from "../../contexts/purchaseContext";
import purchaseTypes from "../../types/purchaseTypes";
import { toast } from "react-hot-toast";
import { AxiosError, AxiosResponse } from "axios";
import { Family, PaginatedResponse, Purchase } from "../../types/objectTypes";
import { PaginatorParams } from "../../types/PaginatorParams";

const PurchasesScreen = () => {
  const [paginatorParams, setPaginatorParams] = useState<PaginatorParams>({
    baseUrl: "/medicines/purchase",
    totalCount: 0,
    nextUrl: null,
    prevUrl: null,
  });

  const [families, setFamilies] = useState<Array<Family>>([]);
  useRequest(
    () => api.get("/families/"),
    (response: AxiosResponse<PaginatedResponse<Family>>) => {
      setFamilies(response.data.results);
    },
    (error: AxiosError) => {}
  );

  const [{ medicineName, familyId }, handleInputChange] = useForm({
    medicineName: "",
    familyId: "",
  });

  const [filterByUser, setFilterByUser] = useState(false);
  const handleCheckbox = () => {
    setFilterByUser(!filterByUser);
  };

  const { purchasesDispatch } = useContext(PurchaseContext);
  const handleSearchByMedicine = (e: React.FormEvent) => {
    e.preventDefault();

    let searchParams = {};

    if (medicineName !== "")
      searchParams = { ...searchParams, medicine_name: medicineName };

    searchParams = { ...searchParams, filter_by_user: filterByUser };

    if (familyId !== "")
      searchParams = { ...searchParams, family_ids: familyId };

    api
      .get("/medicines/purchase", { params: searchParams })
      .then((response: AxiosResponse<PaginatedResponse<Purchase>>) => {
        purchasesDispatch({ type: purchaseTypes.clear });
        response.data.results.map((purchase) =>
          purchasesDispatch({ type: purchaseTypes.add, payload: purchase })
        );

        setPaginatorParams({
          ...paginatorParams,
          totalCount: response.data.count,
          nextUrl: response.data.next,
          prevUrl: response.data.previous,
        });
      })
      .catch((error) => toast.error("Error al buscar"));
  };

  return (
    <div className="medicine-screen animate__animated animate__fadeIn">
      <div className="medicines-buttons">
        <form
          className="search-purchases-form"
          onSubmit={handleSearchByMedicine}
        >
          <input
            className="form-control medicine-search-input"
            type="text"
            placeholder="Buscar por medicamento"
            name="medicineName"
            value={medicineName}
            onChange={handleInputChange}
          />

          <button type="submit" className="create-family-button">
            Buscar
          </button>

          <select
            className="form-select family-selector clickable"
            name="familyId"
            value={familyId}
            onChange={handleInputChange}
          >
            <option value="">Seleccione su familia</option>
            {families.map((family) => (
              <option value={family.id} key={family.id}>
                {family.family_name}
              </option>
            ))}
          </select>

          <div className="form-check family-selector">
            <label className="form-check-label" htmlFor="listByUser">
              Mostrar solo mis compras
            </label>
            <input
              id="listByUser"
              className="form-check-input clickable"
              type="checkbox"
              name="listByUser"
              checked={filterByUser}
              onChange={handleCheckbox}
            />
          </div>
        </form>
      </div>

      <PurchaseTable
        paginatorParams={paginatorParams}
        setPaginatorParams={setPaginatorParams}
      />
    </div>
  );
};

export default PurchasesScreen;
