import React, { useState } from 'react';
import styled from 'styled-components'
import { sideItems, HrSideNav} from '../data.js/sideItems';
import { Link, useLocation } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import LogoutModal from './logout';
import LogoComponent from './logo';

const user = JSON.parse(localStorage.getItem('userDetails'))


const Container = styled.div``
const Top = styled.div``
const Center = styled.div``
const Bottom = styled.div``

const Siderbar = () => {
    
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  

  return (
    <div> 
          { 
        isModalOpen &&  <LogoutModal 
          isModalOpen = {isModalOpen}
          handleCancel = {handleCancel}
        />
       }
    <Container className='flex flex-col justify-between h-screen w-full bg-primary400 text-white'>
       <Top className='px-4 h-16 flex items-center'>
       <LogoComponent />
       <span>
       ATS
       </span>
    
      </Top>
       <Center className='flex-1 space-y-3 px-2 mt-2'>
         {  user.role === 'Applicant' &&
            sideItems.map(item => (
            <Link 
            key={item.name} 
            to={item.path}
            className={`flex items-center gap-2 py-2 px-4 cursor-pointer ${location.pathname === item.path ? 'bg-[#d9e7f0] text-[#18425D] rounded-md font-bold' : 'hover:text-[#18425D] hover:bg-[#d9e7f0] hover:rounded-md'}`}
          > 
            <span>{<item.icon className={`${location.pathname === item.path ? 'text-[#18425D]' : ''}`}/>}</span>
            <span>{item.name}</span>
          </Link>
            ))
         }
         {  user.role !== 'Applicant' &&
         HrSideNav.map(item => (
            <Link 
            key={item.name} 
            to={item.path}
            className={`flex items-center gap-2 py-2 px-4 cursor-pointer ${location.pathname === item.path ? 'bg-[#d9e7f0] text-[#18425D] rounded-md font-bold' : 'hover:text-[#18425D] hover:bg-[#d9e7f0] hover:rounded-md'}`}
          > 
            <span>{<item.icon className={`${location.pathname === item.path ? 'text-[#18425D]' : ''}`}/>}</span>
            <span>{item.name}</span>
          </Link>
            ))
         }
       </Center>
       <Bottom 
       onClick={showModal}
       className='px-6 py-2 flex gap-2 items-center cursor-pointer'> 
         <span>
          <CiLogout style={{color:'#fff'}}/>
         </span>
         <span>Logout</span>
       </Bottom>
    </Container>
 
    </div>
  );
}

export default Siderbar;
