import React from 'react';
import "./createMedicine.scss"
import useForm from "../../hooks/useForm";
import {toast, Toaster} from "react-hot-toast";

const MedicineCreateScreen = () => {

  const [{name, maker, quantity, unit}, handleInputChange, reset] = useForm({
    name: "",
    maker: "",
    quantity: "",
    unit: ""
  })

  const handleCreateMedicine = (e) => {
    e.preventDefault();

    if (name === "" || maker === "" || quantity === "" || unit === "") {
      toast.error("Todos los campos son requeridos")
      return;
    }

    
  }

  return (
    <div className="family-screen animate__animated animate__fadeIn">
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
        <button type="submit" className="primary-button">Crear</button>
      </form>
      <Toaster/>
    </div>
  );
};

export default MedicineCreateScreen;