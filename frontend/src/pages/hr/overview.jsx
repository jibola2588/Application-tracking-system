import React from 'react';
import styled from 'styled-components'
import { BsPlus } from "react-icons/bs";
import {useNavigate} from 'react-router-dom'
import { PiUsersFour } from "react-icons/pi";
import { MdOutlineMeetingRoom } from "react-icons/md";

const Container = styled.div``

const Overview = () => {

  const navigate = useNavigate()

  const createJobs = () => { 
    navigate('/dashboard/create-job')
  }
  return (
    <Container>
    <div className='flex justify-between'>
    <div className='flex gap-4'> 
    <div className='h-40 w-48 rounded-md p-4 border border-silver flex flex-col justify-between'>
    <div className='flex justify-between items-center'> 
         <label>Applicants</label>
        <PiUsersFour />
    </div>
    <span>3</span>
    </div>
    <div className='h-40 w-48 rounded-md p-4 border border-silver flex flex-col justify-between'>
    <div className='flex justify-between items-center'> 
         <label>Ready to interviews</label>
        <MdOutlineMeetingRoom />
    </div>
    <span>4</span>
    </div>
    </div>
    <div 
    onClick={createJobs}
    className='w-[8rem] h-10 bg-transparent border border-primary400 rounded-md flex items-center gap-1 py-2 px-3 cursor-pointer'>
        <BsPlus className='text-primary400'/>
        <span className='text-primary400'>Create jobs</span>
    </div>
  
    </div>
    <div>Top</div>
 </Container>
  );
}

export default Overview;



