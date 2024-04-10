import React from 'react';
import ApplicationsTable from '../../components/tables/applications';

const Applications = () => {
  return (
    <div>
    <h3 className='font-medium text-lg'>List of all applications</h3>
      <ApplicationsTable />
    </div>
  );
}

export default Applications;
