import React from 'react';
import "./paginator.scss"

const Paginator = () => {
  return (
    <div className="paginator-container">
      <button className="primary-button">prev</button>
      <div className="paginator-space-top paginator-space-item">1</div>
      <div className="paginator-space-top">/</div>
      <div className="paginator-space-top">10</div>
      <button className="primary-button paginator-space-item">next</button>
    </div>
  );
};

export default Paginator;