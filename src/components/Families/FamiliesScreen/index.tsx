import React, { useContext } from "react";
import "../families.scss";
import FamilyTable from "../FamilyTable";
import useForm from "../../../hooks/useForm";
import api from "../../../apis/api";
import { AuthContext } from "../../../auth/authContext";
import { FamilyContext } from "../../../contexts/familyContext";
import familyTypes from "../../../types/familyTypes";
import authTypes from "../../../types/authTypes";
import { toast } from "react-hot-toast";
import { AxiosResponse } from "axios";
import { Family } from "../../../types/objectTypes";

const FamiliesScreen = () => {
  const { userDispatch } = useContext(AuthContext);
  const { familiesDispatch } = useContext(FamilyContext);

  const [{ new_family_name }, handleInputChange, reset] = useForm({
    new_family_name: "",
  });

  const handleCreateFamily = (e: React.FormEvent) => {
    e.preventDefault();

    api
      .post("/families/", {
        family_name: new_family_name,
      })
      .then((response: AxiosResponse<Family>) => {
        familiesDispatch({
          type: familyTypes.add,
          payload: response.data,
        });

        toast.success("Familia creada correctamente");
        reset();
      })
      .catch((error) => {
        toast.error("Error al crear la familia");

        // If returned 401
        if (error.response && error.response.status === 401)
          userDispatch({ type: authTypes.logout });
      });
  };

  return (
    <div className="family-screen animate__animated animate__fadeIn animate__faster">
      <form className="create-family-form" onSubmit={handleCreateFamily}>
        <input
          className="form-control create-family-input"
          type="text"
          placeholder="Nombre de familia"
          name="new_family_name"
          value={new_family_name}
          onChange={handleInputChange}
        />

        <button type="submit" className="create-family-button">
          Crear Familia
        </button>
      </form>

      <FamilyTable />
    </div>
  );
};

export default FamiliesScreen;
