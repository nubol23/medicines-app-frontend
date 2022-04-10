import React, {useState} from 'react';
import useForm from "../../hooks/useForm";
import "./purchases.scss"
import PurchaseTable from "../PurchaseTable";
import useRequest from "../../hooks/useRequest";
import api from "../../apis/api";

const PurchasesScreen = () => {

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

  const [{medicineName, familyId}, handleInputChange] = useForm({medicineName: '',})

  const [filterByUser, setFilterByUser] = useState(false);
  const handleCheckbox = () => {
    setFilterByUser(!filterByUser);
  }

  const handleSearchByMedicine = (e) => {
    e.preventDefault();

  }

  return (
    <div className="medicine-screen animate__animated animate__fadeIn">

      <div className="medicines-buttons">
        <form className="search-purchases-form" onSubmit={handleSearchByMedicine}>
          <input
            className="form-control medicine-search-input"
            type="text"
            placeholder="Buscar por medicamento"
            name="medicineName"
            value={medicineName}
            onChange={handleInputChange}
          />

          <button type="submit" className="create-family-button">Buscar</button>

          <select
            className="form-select family-selector"
            name="familyId"
            value={familyId}
            onChange={handleInputChange}
          >
            <option value="">Seleccione su familia</option>
            {
              families.map(family => <option value={family.id} key={family.id}>{family.family_name}</option>)
            }
          </select>

          <div className="form-check family-selector">
            <label className="form-check-label" htmlFor="listByUser">Filtrar por usuario</label>
            <input
              id="listByUser"
              className="form-check-input"
              type="checkbox"
              name="listByUser"
              checked={filterByUser}
              onChange={handleCheckbox}
            />
          </div>
        </form>
      </div>

      <PurchaseTable familyId={familyId} filterByUser={filterByUser}/>
    </div>
  );
};

export default PurchasesScreen;