import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { RxAvatar } from "react-icons/rx";
import { useLocation } from 'react-router-dom';

const Container = styled.div``
const Left = styled.div``
const Right = styled.div``

const data = JSON.parse(localStorage.getItem('user'));

const Navbar = () => {
  const [breadcrumb, setBreadcrumb] = useState('Home');
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname; 
    console.log('path is here',path);
    switch (path) {
        case '/dashboard/interview':
            setBreadcrumb('Interview');
            break;
        case '/dashboard/jobs':
            setBreadcrumb('Jobs');
            break;
        case '/dashboard/create-job':
            setBreadcrumb('Jobs');
            break;
        case '/dashboard/profile':
            setBreadcrumb('Profile');
            break;
        default:
            setBreadcrumb('Overview');
    }
}, [location.pathname]);

  return (
    <Container className='w-full border-b border-silver px-4 h-16 flex items-center justify-between'>
          <Left>
            {breadcrumb}
          </Left>
          <Right>
              <div className='flex items-center gap-1'> 
                 <RxAvatar style={{width:24,height:24}}/>
                 <span>{data ? data?.lastName : 'user'}</span>
              </div>
          </Right>
    </Container>
  );
}

export default Navbar;
