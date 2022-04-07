import React from 'react';
import {useParams} from "react-router-dom";

const FamilyDetails = () => {

  const {familyId} = useParams();

  return (
    <div>
      Family {familyId} details
    </div>
  );
};

export default FamilyDetails;