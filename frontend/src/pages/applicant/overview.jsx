import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DashboardTable from '../../components/tables/dashboard';
import imgL1 from '../../assets/svg/iconL1.svg'
import imgL2 from '../../assets/svg/iconL2.svg'
import imgL3 from '../../assets/svg/iconL3.svg'
import imgL4 from '../../assets/svg/iconL4.svg'
// import DatePicker from "react-datepicker";
import OverviewChart from '../../components/charts/overview';
import { VerticalSpacer } from '../../components/verticalSpacer';
import Axios from 'axios';


const Container = styled.div``
const Top = styled.div``
const Left = styled.div``
const Right = styled.div``
const Center = styled.div``
const Bottom = styled.div``

const UserData = JSON.parse(localStorage.getItem('userDetails'));


const Overview = () => {
  const [startDate, setStartDate] = useState(new Date());

  const [applicationCount, setApplicationCount] = useState(0);
  const [interviewScheduledCount, setInterviewScheduledCount] = useState(0);

  useEffect(() => {
    const fetchApplicationCount = async () => {
      try {
        const userId = UserData._id; 
        const response = await Axios.get(`http://localhost:8000/appliedJob/${userId}`);
        console.log(response, "CHECLKKL")

        const applications = response.data.data;

        const interviewScheduledCount = applications.filter(app => app.status === 'scheduled').length;

        setApplicationCount(response.data.data.length);
        setInterviewScheduledCount(interviewScheduledCount);
      } catch (error) {
        console.error('Error fetching application count:', error);
      }
    };
  
    fetchApplicationCount();
  }, []);
  
  return (
    <Container>
      <Top className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='bg-[#26164e] h-32 rounded-md p-4 border border-silver flex  justify-between text-white items-center'>
         <Left>
           <img src={imgL1} alt='' />
         </Left>
         <Right className='flex flex-col items-end'>
           <p className='leading-[27px] font-medium'>Interview schedule</p>
           <h3 className='font-bold leading-[72px] text-[48px]'>{interviewScheduledCount}</h3>
         </Right>
        </div>
        <div className=' bg-[#367298] h-32 rounded-md p-4 border border-silver flex  justify-between text-white items-center'>
         <Left>
           <img src={imgL2} alt='' />
         </Left>
         <Right className='flex flex-col items-end'>
         <p className='leading-[27px] font-medium'>Application sent</p>
           <h3 className='font-bold leading-[72px] text-[48px]'>{applicationCount}</h3>
         </Right>
        </div>
        <div className=' bg-[#1BD084] h-32 rounded-md p-4 border border-silver flex  justify-between text-white items-center'>
         <Left>
           <img src={imgL3} alt='' />
         </Left>
         <Right className='flex flex-col items-end'>
         <p className='leading-[27px] font-medium'>Profile viewed</p>
           <h3 className='font-bold leading-[72px] text-[48px]'>0</h3>
         </Right>
        </div>
        <div className=' bg-[#8BC740] h-32 rounded-md p-4 border border-silver flex  justify-between text-white items-center'>
         <Left>
           <img src={imgL4} alt='' />
         </Left>
         <Right className='flex flex-col items-end'>
           <p className='leading-[27px] font-medium'>Unread messages</p>
           <h3 className='font-bold leading-[72px] text-[48px]'>0</h3>
         </Right>
        </div>
      </Top>
      <Center> 
      <VerticalSpacer size='40px'/>
       <OverviewChart />
      </Center>
      <Bottom>
      {/* <VerticalSpacer size='40px'/>
      <h3 className='font-medium text-xl'>Interviews</h3>
      <VerticalSpacer size='20px'/>
       <DashboardTable /> */}
      </Bottom>
    </Container>
  );
}

export default Overview;
