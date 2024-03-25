import React from 'react';
import styled from 'styled-components';
import DashboardTable from '../../components/tables/dashboard';

const Container = styled.div``
const Top = styled.div``
const Bottom = styled.div``


const Overview = () => {
  return (
    <Container>
      <Top className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='h-40 rounded-md p-4 border border-silver flex flex-col justify-between'>
          <label>Upcoming interviews</label>
          <span>3</span>
        </div>
        <div className='h-40 rounded-md p-4 border border-silver flex flex-col justify-between'>
          <label>Applied jobs</label>
          <span>10</span>
        </div>
        <div className='h-40 rounded-md p-4 border border-silver flex flex-col justify-between'>
          <label>Refferals</label>
          <span>2</span>
        </div>
      </Top>
      <Bottom className='mt-4'>
       <DashboardTable />
      </Bottom>
    </Container>
  );
}

export default Overview;
