import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import api from "../../apis/api";
import "./familyDetails.scss"

const FamilyDetails = () => {

  const {familyId} = useParams();
  const [family, setFamily] = useState({id: familyId, family_name: ""});

  useRequest(
    () => api.get(`/families/${familyId}`),
    (response) => {
      setFamily(response.data)
    },
    (error) => {
    },
  )


  return (
    <div className="medicine-screen">
      <div className="family-editable-row">
        <h4 className="editable-name">
          {family.family_name}
        </h4>

        <button className="primary-button">Invitar</button>
      </div>
    </div>
  );
};

export default FamilyDetails;