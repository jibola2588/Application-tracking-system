import React from 'react';
import ApplicantTable from '../../components/tables/applicant';


const Application = () => {
  return (
    <div>
      <h3 className='text-2xl font-medium leading-[70px]'>List of Applicants</h3>
      <ApplicantTable />
    </div>
  );
}

export default Application;
