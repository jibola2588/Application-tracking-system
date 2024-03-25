import React from 'react';

const EmptyStateComponent = ({ type }) => {
  return (
    <>
      <br />
      <div className="pt-3">
        <div className="text-center flex justify-center items-center">
          <img src={'../assets/svg/empty-template.svg'} alt="Empty State" />
        </div>
        <br />
        <div className="empty-state text-center">No {type} list available</div>
      </div>
    </>
  );
};

export default EmptyStateComponent;
