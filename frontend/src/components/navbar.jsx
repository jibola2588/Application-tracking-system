import React from 'react';
import styled from 'styled-components'
import { RxAvatar } from "react-icons/rx";

const Container = styled.div``
const Left = styled.div``
const Right = styled.div``

const data = JSON.parse(localStorage.getItem('user'));

const Navbar = () => {
  return (
    <Container className='w-full border-b border-silver px-4 h-16 flex items-center justify-between'>
          <Left>
            Breadcumb
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
