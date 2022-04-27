import React, { FC, useState } from "react";
import api from "../../apis/api";
import { ActionType, PaginatorParams } from "../../types/PaginatorParams";
import "./paginator.scss";

type Props = {
  params: PaginatorParams;
  setParams: (params: PaginatorParams) => void;
  dispatch: (type: { type: string; payload?: any }) => void;
  actionType: ActionType;
};

const Paginator: FC<Props> = ({ params, setParams, dispatch, actionType }) => {
  const [page, setPage] = useState(1);

  const updatePageRequest = (newPageNumber: number) => {
    api
      .get(params.baseUrl, { params: { page: newPageNumber } })
      .then((response) => {
        setPage(newPageNumber);
        setParams({
          ...params,
          nextUrl: response.data.next,
          prevUrl: response.data.previous,
        });

        dispatch({ type: actionType.clear });
        response.data.results.map((o: any) =>
          dispatch({ type: actionType.add, payload: o })
        );
      });
  };

  const handlePrevious = () => {
    if (params.prevUrl !== null) {
      updatePageRequest(page - 1);
    }
  };

  const handleNext = () => {
    if (params.nextUrl !== null) {
      updatePageRequest(page + 1);
    }
  };

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
      <div className="paginator-space-top">
        {Math.ceil(params.totalCount / 20)}
      </div>

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
