import React from 'react';
import "./loading.scss";

const Index = () => {
  return (
    <div className="loader">
      <svg className="circular">
        <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"/>
      </svg>
    </div>
  );
};

export default Index;