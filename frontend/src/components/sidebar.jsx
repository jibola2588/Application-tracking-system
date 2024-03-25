import React, { useState } from 'react';
import styled from 'styled-components'
import { sideItems } from '../data.js/sideItems';
import { Link, useLocation } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import LogoutModal from './logout';



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
    <Container className='flex flex-col justify-between h-screen w-full'>
       <Top className='px-4 h-16 flex items-center'>
          ATS
      </Top>
       <Center className='flex-1 space-y-3'>
         { 
            sideItems.map(item => (
            <Link 
            key={item.name} 
            to={item.path}
            className={`flex items-center gap-1 py-2 px-4 cursor-pointer ${location.pathname === item.path ? 'bg-blue-300 text-white font-medium' : 'hover:bg-blue-50'}`}
          > 
            <span>{<item.icon className={`${location.pathname === item.path ? 'text-white' : ''}`}/>}</span>
            <span>{item.name}</span>
          </Link>
            ))
         }
       </Center>
       <Bottom 
       onClick={showModal}
       className='px-4 py-2 flex gap-1 items-center cursor-pointer'> 
         <span>
          <CiLogout style={{color:'#000'}}/>
         </span>
         <span>Logout</span>
       </Bottom>
    </Container>
 
    </div>
  );
}

export default Siderbar;
