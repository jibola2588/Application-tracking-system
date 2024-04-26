import React from 'react';
import img from '../../assets/svg/empty-template.svg'

const EmptyStateComponent = ({ type }) => {
  return (
    <>
      <br />
      <div className="pt-3">
        <div className="text-center flex justify-center items-center">
          <img src={img} alt="Empty State" />
        </div>
        <br />
        <div className="empty-state text-center">No {type} available</div>
      </div>
    </>
  );
};

export default EmptyStateComponent;
