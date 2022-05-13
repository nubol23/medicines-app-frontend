import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import useRequest from "../../../hooks/useRequest";
import api from "../../../apis/api";
import { toast } from "react-hot-toast";
import {
  Family,
  Medicine,
  PaginatedResponse,
} from "../../../types/objectTypes";
import { AxiosError, AxiosResponse } from "axios";

const PurchaseCreateScreen = () => {
  const { medicineId } = useParams();

  const [medicine, setMedicine] = useState<Medicine>({
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
        id: response.data.id,
        name: response.data.name,
        maker: response.data.maker,
        quantity: response.data.quantity,
        unit: response.data.unit,
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

  const [{ familyId, buyDate, expirationDate, quantity }, handleInputChange] =
    useForm({
      familyId: "",
      buyDate: "",
      expirationDate: "",
      quantity: "",
    });
  const navigate = useNavigate();

  const handlePurchase = (e: React.FormEvent) => {
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
      .post("/medicines/purchase", {
        medicine: medicineId,
        family: familyId,
        buy_date: buyDate,
        expiration_date: expirationDate,
        units: quantity,
      })
      .then((response) => {
        toast.success("Compra registrada correctamente");
        navigate("/purchases");
      })
      .catch((error) => {
        toast.error("Error al registrrar la compra");
      });
  };

  return (
    <div className="create-medicine-screen animate__animated animate__fadeIn">
      <form className="create-medicine-form" onSubmit={handlePurchase}>
        <div>
          <p>
            Registrando compra de {medicine.name}
            <br />
            Cantidad: {medicine.quantity} {medicine.unit}
            <br />
            Fabricante: {medicine.maker}
          </p>
        </div>

        <select
          className="form-select create-medicine-form-input"
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

        <label htmlFor="buyDate">Fecha de compra</label>
        <input
          id="buyDate"
          className="form-control create-medicine-form-input"
          type="date"
          name="buyDate"
          value={buyDate}
          onChange={handleInputChange}
        />
        <label htmlFor="expirationDate">Fecha de expiración</label>
        <input
          id="expirationDate"
          className="form-control create-medicine-form-input"
          type="date"
          name="expirationDate"
          value={expirationDate}
          onChange={handleInputChange}
        />
        <input
          className="form-control create-medicine-form-input"
          type="text"
          placeholder="Cantitdad unitaria"
          name="quantity"
          value={quantity}
          onChange={handleInputChange}
        />
        <button type="submit" className="create-medicine-button">
          Registrar compra
        </button>
      </form>
    </div>
  );
};

export default PurchaseCreateScreen;
