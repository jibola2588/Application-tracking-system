import React, { useState } from 'react';
import styled from 'styled-components';
import { IoCloseOutline } from "react-icons/io5";
import Button from './button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Backdrop = styled.div`
  width:100%;
  height:100vh;
  background:rgba(0,0,0,0.3);
  position:fixed;
  top:0;
  left:0;  
`
const Wrapper = styled.div`
  background:white;
  border-radius:10px;
  max-width:500px;
  height:150px;
  margin:2rem auto 0rem;
  padding:1rem;
`

const LogoutModal = (props) => {
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const {handleCancel, show } = props;

  const handleOk = () => {
  console.log('logging out');
  localStorage.clear();
  localStorage.removeItem('token');
  localStorage.removeItem('userDetails'); 
   sessionStorage.clear();
  
  toast.success('Logout successful!')
    navigate('/login')
    window.location.reload(); 
  };

  return (
    <Backdrop show={show}> 
      <Wrapper show={show} className='flex flex-col justify-between'>
        <div className='flex justify-end'> 
          <IoCloseOutline className='cursor-pointer' onClick={handleCancel} style={{width:'20px',height:'20px' }}/>
        </div> 
        <h3 className='pl-4'>Confirmation to log out!</h3>
        <form onSubmit={handleOk}> 
          <div> 
            <div className='flex justify-end space-x-2'> 
              <span onClick={handleCancel} className='border border-[silver] w-24 text-center text-black rounded-md cursor-pointer flex items-center justify-center'>Cancel</span>
              <span className='w-24'> 
                <Button 
                  label="Proceed"
                  type='submit'
                  color='danger'
                  size='small'
                /> 
              </span>
            </div>
          </div>
        </form>
      </Wrapper>
    </Backdrop>
  );
};

export default LogoutModal;
