import React, {useContext} from 'react';
import "./family.scss"
import FamilyTable from "../FamilyTable";
import useForm from "../../hooks/useForm";
import api from "../../apis/api";
import {AuthContext} from "../../auth/authContext";
import {FamilyContext} from "../../contexts/familyContext";
import familyTypes from "../../types/familyTypes";
import authTypes from "../../types/authTypes";

const FamilyScreen = () => {

  const {userDispatch} = useContext(AuthContext);
  const {familiesDispatch} = useContext(FamilyContext);

  const [{new_family_name}, handleInputChange] = useForm({new_family_name: '',})

  const handleCreateFamily = (e) => {
    e.preventDefault();

    api.post("/families/", {
      family_name: new_family_name,
    })
      .then((response) => {
        familiesDispatch({
          type: familyTypes.addFamily,
          payload: response.data,
        })
      })
      .catch((error) => {

        console.log("Error creating")

        // If returned 401
        if (error.response && error.response.status === 401)
          userDispatch({type: authTypes.logout});
      })
  }

  return (
    <div className="family-screen">
      <form className="create-family-form" onSubmit={handleCreateFamily}>
        <input
          className="form-control create-family-input"
          type="text"
          placeholder="Nombre de familia"
          name="new_family_name"
          value={new_family_name}
          onChange={handleInputChange}
        />

        <button type="submit" className="create-family-button">Crear Familia</button>
      </form>

      <FamilyTable/>
    </div>
  );
};

export default FamilyScreen;