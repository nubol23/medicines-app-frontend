import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import useForm from "../../hooks/useForm";
import useRequest from "../../hooks/useRequest";
import api from "../../apis/api";
import {toast} from "react-hot-toast";

const PurchaseCreateScreen = () => {
  const {medicineId} = useParams()

  const [medicine, setMedicine] = useState({
    id: "",
    name: "",
    maker: "",
    quantity: "",
    unit: "",
  });
  useRequest(
    () => api.get(`/medicines/medicines/${medicineId}`),
    (response) => {
      setMedicine({
        id: response.data.id,
        name: response.data.name,
        maker: response.data.maker,
        quantity: response.data.quantity,
        unit: response.data.unit,
      })
    },
    (error) => {
    }
  )

  const [{buyDate, expirationDate, quantity}, handleInputChange] = useForm({
    buyDate: "",
    expirationDate: "",
    quantity: "",
  })

  const handlePurchase = (e) => {
    e.preventDefault();

    if (buyDate === "" || expirationDate === "" || quantity === "")
      toast.error("Todos los campos son requeridos")

    
  }

  return (
    <div className="create-medicine-screen animate__animated animate__fadeIn">
      <form className="create-medicine-form" onSubmit={handlePurchase}>
        <p>Comprando medicamento {medicine.name} - {medicine.maker}: {medicine.quantity} {medicine.unit}</p>

        <input
          className="form-control create-medicine-form-input"
          type="date"
          name="buyDate"
          value={buyDate}
          onChange={handleInputChange}
        />
        <input
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
        <button type="submit" className="create-medicine-button">Registrar compra</button>
      </form>
    </div>
  );
};

export default PurchaseCreateScreen;