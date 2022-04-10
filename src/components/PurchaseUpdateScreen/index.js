import React from 'react';
import {useParams} from "react-router-dom";

const PurchaseUpdateScreen = () => {

  const {medicineId, purchaseId} = useParams()

  return (
    <div>
      Medicine: {medicineId}<br/>
      Purchase: {purchaseId}
    </div>
  );
};

export default PurchaseUpdateScreen;