import React, { useState } from 'react';
import { Drawer } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { VerticalSpacer } from '../../../verticalSpacer';

const currentDate = moment().format('YYYY-MM-DD');


const Top = styled.div``
const Bottom = styled.div``

const Status = styled.div`
    color: ${(props) => {
        switch (props.type) {
            case 'pending':
                return 'orange';
            case 'completed':
                return 'green'; 
            case 'cancelled':
                return 'red'; 
            default:
                return 'black'; 
        }
    }};
    background-color: ${(props) => {
        switch (props.type) {
            case 'pending':
                return 'lightyellow'; 
            case 'completed':
                return 'lightgreen'; 
            case 'cancelled':
                return 'lightcoral';
            default:
                return 'white'; 
        }
    }};
`;

const Trackwrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    position:relative;
    margin-bottom: 2rem;
`
const Trackline = styled.hr`
    border: 1px dashed #333333;
    height: 60px;
    position: absolute;
    top: 75%;
    left: 9px;
`
const orderPlaced = styled.div`
     font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.005em;
    text-align: left;
`
const orderedContent = styled.div`
    font-size: 14px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: -0.005em;
    text-align: left;
`
const Dot = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => {
        switch (props.type) {
            case 'submitted':
                return '#B2ADAD'; 
            case 'test':
                return '#18425D'; 
            case 'failed':
                return 'red';
            case 'scheduled':
                return 'orange';
            case 'passed':
                return 'green';
            case 'successful':
                return 'green';
            case 'rejected':
                return 'red';
            default:
                return 'white'; 
        }
    }};
`
const Application = ({open,onclose,item}) => {

  const [trackArray,setTrackArray] = useState([
    {
      status:'submitted',
      title:'Application received',
      date:currentDate,
    },
    {
      status:'test',
      title:'Test conducted',
      date:currentDate,
    },
    {
      status:'scheduled',
      title:'Interview scheduled',
      date:currentDate,
    },
    {
      status:'passed',
      title:'Interview passed',
      date:currentDate,
    },
    {
      status:'successful',
      title:'Applicantion successful',
      date:currentDate,
    },
  ])
 
  return (
    <>
      <Drawer title="Applicant details" onClose={onclose} open={open} width={600}>
       <section> 
       <Top>
          <div className='flex items-center justify-between'>
            <span className='text-[17px] leading-8'>Applicant Id</span>
            <span className='text-[17px]  leading-8'>{item._id}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-[17px] leading-8'>Applicant Date</span>
            <span className='text-[17px]  leading-8'>{item.appliedAt}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-[17px] leading-8'>Applicant Name</span>
            <span className='text-[17px] leading-8'>{item.firstName +' '+ item.lastName}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-[17px] leading-8'>Applicant Designation</span>
            <span className='text-[17px]  leading-8'>{item.designation}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-[17px]  leading-8'>Status</span>
            <Status type = {item.status} className='py-1 px-2 rounded-md'> 
                {item.status}
              </Status>
          </div>
          </Top>
          <Bottom> 
         <VerticalSpacer size='3rem'/>
         <h3 className='text-xl leading-[70px]'>Application process</h3>
          <div className="tracking-info">
          { 
            trackArray.map((item,index) => ( 
                <Trackwrapper key={index}>
                  <Dot type={item.status}></Dot>
                  <div className="flex flex-col">
                    <orderPlaced>{item.title}</orderPlaced>
                    <orderedContent>{currentDate}</orderedContent>
                  </div>
                {
                  index < trackArray.length - 1 && <Trackline/>
                }    
                </Trackwrapper>
            ))
          }         
              </div>
          </Bottom>
       </section>
      </Drawer>
    </>
  );
};
export default Application;