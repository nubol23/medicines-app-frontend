import React, {useContext, useState} from 'react';
import "../MedicineCreateScreen/createMedicine.scss"
import useForm from "../../hooks/useForm";
import {toast, Toaster} from "react-hot-toast";
import {AuthContext} from "../../auth/authContext";
import {useNavigate, useParams} from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import api from "../../apis/api";

const MedicineUpdateScreen = () => {

  const [buttonDisabled, setDisabled] = useState(false);
  const navigate = useNavigate()
  const {userDispatch} = useContext(AuthContext);
  const [{name, maker, quantity, unit}, handleInputChange, reset] = useForm({
    name: "",
    maker: "",
    quantity: "",
    unit: ""
  })

  const {medicineId} = useParams()
  useRequest(
    api.get(`/medicines/medicines/${medicineId}`),
    (response) => {
      // medicinesDispatch({type: medicineTypes.clear});
      // medicinesDispatch({
      //   type: medicineTypes.addMultiple,
      //   payload: response.data.results,
      // });

      console.log(response.data)
      // handleInputChange({target: {name: "name", value: response.data.name}})
      // handleInputChange({target: {name: "maker", value: response.data.name}})
      // handleInputChange({target: {name: "quantity", value: response.data.name}})
      // handleInputChange({target: {name: "unit", value: response.data.name}})
    },
    (error) => {
    },
  )

  const handleCreateMedicine = (e) => {
    e.preventDefault();

    if (name === "" || maker === "" || quantity === "" || unit === "") {
      toast.error("Todos los campos son requeridos")
      return;
    }

    // api.post("/medicines/medicines/", {
    //   name,
    //   maker,
    //   quantity,
    //   unit,
    // })
    //   .then((response) => {
    //     toast.success("Medicina creada correctamente")
    //     setDisabled(true);
    //
    //     setTimeout(() => {
    //       reset();
    //       setDisabled(false);
    //       navigate("/medicines");
    //     }, 1000);
    //   })
    //   .catch((error) => {
    //
    //     toast.error("Error al crear medicina")
    //
    //     // If returned 401
    //     if (error.response && error.response.status === 401)
    //       userDispatch({type: authTypes.logout});
    //   })
  }

  return (
    <div className="create-medicine-screen animate__animated animate__fadeIn">
      <form className="create-medicine-form" onSubmit={handleCreateMedicine}>
        <input
          className="form-control create-medicine-form-input"
          type="text"
          placeholder="Nombre medicamento"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
        <input
          className="form-control create-medicine-form-input"
          type="text"
          placeholder="Fabricante"
          name="maker"
          value={maker}
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
        <input
          className="form-control create-medicine-form-input"
          type="text"
          placeholder="Unidad"
          name="unit"
          value={unit}
          onChange={handleInputChange}
        />
        <button type="submit" className="create-medicine-button" disabled={buttonDisabled}>Actualizar</button>
      </form>
      <Toaster/>
    </div>
  );
};

export default MedicineUpdateScreen;