import React from 'react';
import "./paginator.scss"

const Paginator = ({params}) => {

  const handlePrevious = () => {

  }

  const handleNext = () => {

  }

  return (
    <div className="paginator-container">
      <button className="primary-button-icon" onClick={handlePrevious}>
        <i className="material-icons">chevron_left</i>
      </button>

      <div className="paginator-space-top paginator-space-item">1</div>
      <div className="paginator-space-top">/</div>
      <div className="paginator-space-top">{Math.ceil(params.totalCount / 20)}</div>

      <button className="primary-button-icon paginator-space-item" onClick={handleNext}>
        <i className="material-icons">chevron_right</i>
      </button>

    </div>
  );
};

export default Paginator;