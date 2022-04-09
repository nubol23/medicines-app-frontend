import React, {useState} from 'react';
import "./paginator.scss"
import api from "../../apis/api";

const Paginator = ({params, setParams, dispatch, actionType}) => {
  const [page, setPage] = useState(1);

  const updatePageRequest = (newPageNumber) => {
    api.get(params.baseUrl, {params: {page: newPageNumber}})
      .then((response) => {

        setPage(newPageNumber)
        setParams({
          ...params,
          nextUrl: response.data.next,
          prevUrl: response.data.previous,
        })

        dispatch({type: actionType.clear});
        dispatch({
          type: actionType.addMultiple,
          payload: response.data.results,
        });

      })
  }

  const handlePrevious = () => {
    if (params.prevUrl !== null) {
      updatePageRequest(page - 1)
    }
  }

  const handleNext = () => {
    if (params.nextUrl !== null) {
      updatePageRequest(page + 1)
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