import React, {useContext, useState} from 'react';
import "./paginator.scss"
import api from "../../apis/api";
import {MedicineContext} from "../../contexts/medicineContext";
import medicineTypes from "../../types/medicineTypes";

const Paginator = ({params, setParams}) => {
  const [page, setPage] = useState(1);
  const {medicines, medicinesDispatch} = useContext(MedicineContext);

  const handlePrevious = () => {

  }

  const handleNext = () => {
    if (params.nextUrl !== null) {
      api.get(params.baseUrl, {params: {page: page + 1}})
        .then((response) => {

          setPage(page + 1)
          setParams({
            ...params,
            nextUrl: response.data.next,
            prevUrl: response.data.previous,
          })

          medicinesDispatch({type: medicineTypes.clear});
          medicinesDispatch({
            type: medicineTypes.addMultiple,
            payload: response.data.results,
          });

        })
    }
  }

  return (
    <div className="paginator-container">
      <button
        className="primary-button-icon"
        onClick={handlePrevious}
        disabled={params.prevUrl === null}
      >
        <i className="material-icons">chevron_left</i>
      </button>

      <div className="paginator-space-top paginator-space-item">{page}</div>
      <div className="paginator-space-top">/</div>
      <div className="paginator-space-top">{Math.ceil(params.totalCount / 20)}</div>

      <button
        className="primary-button-icon paginator-space-item"
        onClick={handleNext}
        disabled={params.nextUrl === null}
      >
        <i className="material-icons">chevron_right</i>
      </button>

    </div>
  );
};

export default Paginator;