import React from 'react';
import {useParams} from "react-router-dom";

const PurchaseCreateScreen = () => {
  const {medicineId} = useParams()

  return (
    <div>
      {medicineId}
    </div>
  );
};

export default PurchaseCreateScreen;