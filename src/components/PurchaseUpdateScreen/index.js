import React, {useContext, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import api from "../../apis/api";
import useForm from "../../hooks/useForm";
import {formatFormDate} from "../../utils/functions";
import {toast} from "react-hot-toast";
import {AuthContext} from "../../auth/authContext";
import authTypes from "../../types/authTypes";

const PurchaseUpdateScreen = () => {

  const [buttonDisabled, setDisabled] = useState(false);
  const {medicineId, purchaseId} = useParams()
  const {userDispatch} = useContext(AuthContext);

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
  const [families, setFamilies] = useState([{
    id: "",
    name: "",
  }])
  useRequest(
    () => api.get("/families/"),
    (response) => {
      setFamilies(response.data.results)
    },
    (error) => {
    }
  )

  const [{familyId, buyDate, expirationDate, quantity}, handleInputChange, reset, handleSetAllValues] = useForm({
    familyId: "",
    buyDate: "",
    expirationDate: "",
    quantity: "",
  })

  useRequest(
    () => api.get(`/medicines/purchase/${purchaseId}`),
    (response) => {
      handleSetAllValues({
        familyId: response.data.family.id,
        buyDate: formatFormDate(response.data.buy_date),
        expirationDate: formatFormDate(response.data.expiration_date),
        quantity: response.data.units,
      })
    },
    (error) => {
    },
  )

  const navigate = useNavigate();
  const handleUpdatePurchase = (e) => {
    e.preventDefault();

    if (familyId === "" || buyDate === "" || expirationDate === "" || quantity === "") {
      toast.error("Todos los campos son requeridos")
      return;
    }

    api.patch(`/medicines/purchase/${purchaseId}`, {
      buy_date: buyDate,
      expiration_date: expirationDate,
      units: quantity,
    })
      .then((response) => {
        toast.success("Compra actualizada correctamente")
        setDisabled(true);

        reset();
        setDisabled(false);
        navigate("/purchases");
      })
      .catch((error) => {

        toast.error("Error al actualizar compra")

        // If returned 401
        if (error.response && error.response.status === 401)
          userDispatch({type: authTypes.logout});
      })
  }

  return (
    <div className="create-medicine-screen animate__animated animate__fadeIn">
      <form className="create-medicine-form" onSubmit={handleUpdatePurchase}>
        <div>
          <p>
            Actualizando compra de {medicine.name}<br/>
            Cantidad: {medicine.quantity} {medicine.unit}<br/>
            Fabricante: {medicine.maker}<br/>
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
          {
            families.map(family => <option value={family.id} key={family.id}>{family.family_name}</option>)
          }
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
        <label htmlFor="units">Cantidad de unidades</label>
        <input
          id="units"
          className="form-control create-medicine-form-input"
          type="text"
          placeholder="Cantitdad unitaria"
          name="quantity"
          value={quantity}
          onChange={handleInputChange}
        />
        <button type="submit" className="create-medicine-button" disabled={buttonDisabled}>Actualizar compra</button>
      </form>
    </div>
  );
};

export default PurchaseUpdateScreen;