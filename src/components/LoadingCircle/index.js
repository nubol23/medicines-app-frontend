import React from 'react';
import "./loading.scss";

const Index = () => {
  return (
    <div className="loader">
      <svg className="circular">
        <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="5" strokeMiterlimit="10"/>
      </svg>
    </div>
  );
};

export default Index;