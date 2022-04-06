import React from 'react';
import "./family.scss"
import ListTable from "../ListTable";
import useForm from "../../hooks/useForm";

const FamilyScreen = () => {

  const [{new_family_name}, handleInputChange] = useForm({new_family_name: '',})

  const handleCreateFamily = (e) => {
    e.preventDefault();

    console.log("CREATE")
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

      <ListTable/>
    </div>
  );
};

export default FamilyScreen;