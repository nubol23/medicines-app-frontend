import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import api from "../../../apis/api";
import useForm from "../../../hooks/useForm";
import { formatFormDate } from "../../../utils/functions";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../auth/authContext";
import authTypes from "../../../types/authTypes";
import { AxiosError, AxiosResponse } from "axios";
import {
  Family,
  Medicine,
  PaginatedResponse,
  Purchase,
} from "../../../types/objectTypes";

const PurchaseUpdateScreen = () => {
  const [buttonDisabled, setDisabled] = useState(false);
  const { medicineId, purchaseId } = useParams();
  const { userDispatch } = useContext(AuthContext);

  const [consumed, setConsumed] = useState(false);
  const handleCheckbox = () => {
    setConsumed(!consumed);
  };

  const [medicine, setMedicine] = useState({
    id: "",
    name: "",
    maker: "",
    quantity: 0,
    unit: "",
  });
  useRequest(
    () => api.get(`/medicines/medicines/${medicineId}`),
    (response: AxiosResponse<Medicine>) => {
      setMedicine({
        id: response.data.id!,
        name: response.data.name!,
        maker: response.data.maker!,
        quantity: response.data.quantity!,
        unit: response.data.unit!,
      });
    },
    (error: AxiosError) => {}
  );
  const [families, setFamilies] = useState<Array<Family>>([]);
  useRequest(
    () => api.get("/families/"),
    (response: AxiosResponse<PaginatedResponse<Family>>) => {
      setFamilies(response.data.results);
    },
    (error: AxiosError) => {}
  );

  const [
    { familyId, buyDate, expirationDate, quantity },
    handleInputChange,
    reset,
    handleSetAllValues,
  ] = useForm({
    familyId: "",
    buyDate: "",
    expirationDate: "",
    quantity: "",
  });

  useRequest(
    () => api.get(`/medicines/purchase/${purchaseId}`),
    (response: AxiosResponse<Purchase>) => {
      handleSetAllValues({
        familyId: response.data.family!.id,
        buyDate: formatFormDate(response.data.buy_date!),
        expirationDate: formatFormDate(response.data.expiration_date!),
        quantity: response.data.units,
      });
      setConsumed(response.data.consumed!);
    },
    (error: AxiosError) => {}
  );

  const navigate = useNavigate();
  const handleUpdatePurchase = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      familyId === "" ||
      buyDate === "" ||
      expirationDate === "" ||
      quantity === ""
    ) {
      toast.error("Todos los campos son requeridos");
      return;
    }

    api
      .patch(`/medicines/purchase/${purchaseId}`, {
        buy_date: buyDate,
        expiration_date: expirationDate,
        units: quantity,
        consumed,
      })
      .then((response) => {
        toast.success("Compra actualizada correctamente");
        setDisabled(true);

        reset();
        setDisabled(false);
        navigate("/purchases");
      })
      .catch((error) => {
        toast.error("Error al actualizar compra");

        // If returned 401
        if (error.response && error.response.status === 401)
          userDispatch({ type: authTypes.logout });
      });
  };

  return (
    <div className="create-medicine-screen animate__animated animate__fadeIn">
      <form className="create-medicine-form" onSubmit={handleUpdatePurchase}>
        <div>
          <p>
            Actualizando compra de {medicine.name}
            <br />
            Cantidad: {medicine.quantity} {medicine.unit}
            <br />
            Fabricante: {medicine.maker}
            <br />
          </p>
        </div>

        <select
          className="form-select create-medicine-form-input"
          name="familyId"
          value={familyId}
          onChange={handleInputChange}
          disabled={true} //Temporal fix
        >
          <option value="">Seleccione su familia</option>
          {families.map((family) => (
            <option value={family.id} key={family.id}>
              {family.family_name}
            </option>
          ))}
        </select>

        <label htmlFor="buyDate">Fecha de compra</label>
        <input
          id="buyDate"
          className="form-control create-medicine-form-input"
          type="date"
          name="buyDate"
          value={buyDate}
          onChange={handleInputChange}
        />
        <label htmlFor="expirationDate">Fecha de expiraci??n</label>
        <input
          id="expirationDate"
          className="form-control create-medicine-form-input"
          type="date"
          name="expirationDate"
          value={expirationDate}
          onChange={handleInputChange}
        />
        <label htmlFor="units">Cantidad de unidades</label>
        <input
          id="units"
          className="form-control"
          type="text"
          placeholder="Cantitdad unitaria"
          name="quantity"
          value={quantity}
          onChange={handleInputChange}
        />

        <div className="form-check family-selector mb-5">
          <label className="form-check-label" htmlFor="consumed">
            Consumido
          </label>
          <input
            id="consumed"
            className="form-check-input clickable"
            type="checkbox"
            name="consumed"
            checked={consumed}
            onChange={handleCheckbox}
          />
        </div>

        <button
          type="submit"
          className="create-medicine-button"
          disabled={buttonDisabled}
        >
          Actualizar compra
        </button>
      </form>
    </div>
  );
};

export default PurchaseUpdateScreen;
