import React from 'react';
import styled from 'styled-components';

const Container = styled.div``
const Top = styled.div``
const Left = styled.div``
const Right = styled.div``
const Bottom = styled.div``

const Profile = () => {
  return (
    <Container className=''>
       <Top className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          <Left>A</Left>
          <Right>B</Right>
       </Top>
       <Bottom></Bottom>
    </Container>
  );
}

export default Profile;
