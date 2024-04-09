import React, { useState } from 'react';
import { Drawer } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { VerticalSpacer } from '../../verticalSpacer';
// import { VerticalSpacer } from '../../../verticalSpacer';

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
const Jobs = ({open,onclose,item}) => {

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
      <Drawer title="Job details" onClose={onclose} open={open} width={800}>
       <section> 
       <Top>
          <div className='flex items-center justify-between'>
            <span className='text-[17px] leading-8'>Company name</span>
            <span className='text-[17px]  leading-8'>{item?.company}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-[17px] leading-8'>Applicant Date</span>
            <span className='text-[17px]  leading-8'>{item?.timePosted}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-[17px] leading-8'>Title</span>
            <span className='text-[17px]  leading-8'>{item?.title}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-[17px] leading-8'>Experience level</span>
            <span className='text-[17px] leading-8'>{item?.experience}</span>
          </div>
         
          <div className='flex items-center justify-between'>
            <span className='text-[17px] leading-8'>Qualifications</span>
            <span className='text-[17px]  leading-8'>{item?.qualifications}</span>
          </div>
          
          <div className='flex items-center justify-between'>
            <span className='text-[17px] leading-8'>Skills</span>
            {/* <span className='text-[17px]  leading-8'>{item?.title}</span> */}
            <div className='flex flex-col'> 
            {item?.skills.map((skill, index) => (
      <span key={index} className='pl-8'>
        <ul className='list-none'>
          <li className='font-medium'>{skill}</li>
        </ul>
      </span>
    ))}
            </div>
          </div>
          <div className='flex items-start justify-between'>
            <span className='text-[17px] leading-8'>Description</span>
            <span className='text-[17px]  leading-8 max-w-lg break-words'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-[17px] leading-8'>Location</span>
            <span className='text-[17px]  leading-8'>{item?.locations}</span>
          </div>

          <div className='flex items-center justify-between'>
            <span className='text-[17px] leading-8'>Days left</span>
            <span className='text-[17px]  leading-8'>{item?.daysLeft}</span>
          </div>
          </Top>
         <VerticalSpacer size='3rem'/>
          <Bottom className='flex justify-end'> 
              <button className='bg-[#18425D] py-3 px-3 rounded-md flex items-center justify-center text-white w-[12rem] font-medium '>Apply</button>
          </Bottom>
       </section>
      </Drawer>
    </>
  );
};
export default Jobs;