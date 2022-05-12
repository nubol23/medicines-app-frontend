import React, { useContext, useState } from "react";
import "./createMedicine.scss";
import useForm from "../../../hooks/useForm";
import { toast } from "react-hot-toast";
import api from "../../../apis/api";
import { AuthContext } from "../../../auth/authContext";
import authTypes from "../../../types/authTypes";
import { useNavigate } from "react-router-dom";

const MedicineCreateScreen = () => {
  const [buttonDisabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { userDispatch } = useContext(AuthContext);
  const [{ name, maker, quantity, unit }, handleInputChange, reset] = useForm({
    name: "",
    maker: "",
    quantity: 0,
    unit: "",
  });

  const handleCreateMedicine = (e: React.FormEvent) => {
    e.preventDefault();

    if (name === "" || maker === "" || quantity === 0 || unit === "") {
      toast.error("Todos los campos son requeridos");
      return;
    }
    setDisabled(true);
    api
      .post("/medicines/medicines/", {
        name,
        maker,
        quantity,
        unit,
      })
      .then((response) => {
        toast.success("Medicina creada correctamente");

        reset();
        setDisabled(false);
        navigate("/medicines");
      })
      .catch((error) => {
        toast.error("Error al crear medicina");

        // If returned 401
        if (error.response && error.response.status === 401)
          userDispatch({ type: authTypes.logout });
      });
  };

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
        <button
          type="submit"
          className="create-medicine-button"
          disabled={buttonDisabled}
        >
          Crear
        </button>
      </form>
    </div>
  );
};

export default MedicineCreateScreen;
