import React, {useContext, useState} from 'react';
import "../MedicineCreateScreen/createMedicine.scss"
import useForm from "../../hooks/useForm";
import {toast} from "react-hot-toast";
import {AuthContext} from "../../auth/authContext";
import {useNavigate, useParams} from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import api from "../../apis/api";
import authTypes from "../../types/authTypes";

const MedicineUpdateScreen = () => {

  const [buttonDisabled, setDisabled] = useState(false);
  const navigate = useNavigate()
  const {userDispatch} = useContext(AuthContext);
  const [{name, maker, quantity, unit}, handleInputChange, reset, handleSetAllValues] = useForm({
    name: "",
    maker: "",
    quantity: "",
    unit: ""
  })

  const {medicineId} = useParams()
  useRequest(
    () => api.get(`/medicines/medicines/${medicineId}`),
    (response) => {
      handleSetAllValues({
        name: response.data.name,
        maker: response.data.maker,
        quantity: response.data.quantity,
        unit: response.data.unit,
      })
    },
    (error) => {
    },
  )

  const handleUpdateMedicine = (e) => {
    e.preventDefault();

    if (name === "" || maker === "" || quantity === "" || unit === "") {
      toast.error("Todos los campos son requeridos")
      return;
    }

    api.patch(`/medicines/medicines/${medicineId}`, {
      name,
      maker,
      quantity,
      unit,
    })
      .then((response) => {
        toast.success("Medicina actualizada correctamente")
        setDisabled(true);

        reset();
        setDisabled(false);
        navigate("/medicines");
      })
      .catch((error) => {

        toast.error("Error al actualizar medicina")

        // If returned 401
        if (error.response && error.response.status === 401)
          userDispatch({type: authTypes.logout});
      })
  }

  return (
    <div className="create-medicine-screen animate__animated animate__fadeIn">
      <form className="create-medicine-form" onSubmit={handleUpdateMedicine}>
        <label htmlFor="name">Nombre del medicamento</label>
        <input
          id="name"
          className="form-control create-medicine-form-input"
          type="text"
          placeholder="Nombre medicamento"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
        <label htmlFor="maker">Fabricante</label>
        <input
          id="maker"
          className="form-control create-medicine-form-input"
          type="text"
          placeholder="Fabricante"
          name="maker"
          value={maker}
          onChange={handleInputChange}
        />
        <label htmlFor="quantity">Cantidad</label>
        <input
          id="quantity"
          className="form-control create-medicine-form-input"
          type="text"
          placeholder="Cantitdad unitaria"
          name="quantity"
          value={quantity}
          onChange={handleInputChange}
        />
        <label htmlFor="units">Unidad</label>
        <input
          id="units"
          className="form-control create-medicine-form-input"
          type="text"
          placeholder="Unidad"
          name="unit"
          value={unit}
          onChange={handleInputChange}
        />
        <button type="submit" className="create-medicine-button" disabled={buttonDisabled}>Actualizar</button>
      </form>
    </div>
  );
};

export default MedicineUpdateScreen;