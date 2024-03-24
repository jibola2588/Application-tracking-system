import React from 'react'
import styled from 'styled-components'
import Navbar from '../../components/navbar'
import { Outlet } from 'react-router-dom'
import Siderbar from '../../components/sidebar'

const Container = styled.div``
const Left = styled.div``
const Right = styled.div``

const Dashboard = () => {
  return (
    <Container className='bg-transparent flex item-center h-screen w-full'>
       <Left className='left border-r-2 border-silver w-1/6'>
        <Siderbar />
       </Left>
       <Right className='right flex-1 flex flex-col'>
         <Navbar />
         <div className='p-4 h-screen w-full overflow-y-auto'> 
             <Outlet />
         </div>
       </Right>
    </Container>
  )
}

export default Dashboard
