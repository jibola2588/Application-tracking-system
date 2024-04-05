import React from 'react';
import logo from '../assets/png/INTS.png'

const LogoComponent = () => {
  return (
    <div className='flex items-center justify-center'> 
    <span className='w-12 h-12'> 
     <img 
      src={logo}
      className='w-[100%] h-[100%] object-contain'
     />
    </span>
   </div>
  );
}

export default LogoComponent;
