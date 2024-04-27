import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { VerticalSpacer } from '../../verticalSpacer';
import Axios from "axios";

const currentDate = moment().format('YYYY-MM-DD');
const UserData = JSON.parse(localStorage.getItem('userDetails'));



const Top = styled.div``
const Bottom = styled.div``

const Status = styled.div`
    color: ${(props) => {
        switch (props.type) {
            case 'pending':
                return 'orange';
            case 'scheduled':
                return 'green'; 
            case 'rejected':
                return 'red'; 
            default:
                return 'black'; 
        }
    }};
    background-color: ${(props) => {
        switch (props.type) {
            case 'pending':
                return 'lightyellow'; 
            case 'scheduled':
                return 'lightgreen'; 
            case 'rejected':
              return "RGB(247 226 222)"
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

  const [trackArray,setTrackArray] = useState([]);

  useEffect(() => {
    // Fetch track array data from an endpoint
    async function fetchTrackArray() {
      try {
        const userId = UserData._id;
        const response = await  Axios.get(`http://localhost:8000/appliedJob/${userId}`);
        setTrackArray(response.data.data);
      } catch (error) {
        console.error('Error fetching track array:', error);
      }
    }
    fetchTrackArray();
  }, []);

 
  return (
    <>
      <Drawer title="Applicant details" onClose={onclose} open={open} width={600}>
       <section> 
       <Top>
          <div className='flex items-center justify-between'>
            <span className='text-[17px] leading-8'>Company name</span>
            <span className='text-[17px]  leading-8'>{item.companyName}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-[17px] leading-8'>Applicant Date</span>
            <span className='text-[17px]  leading-8'>{new Date(item.appliedAt).toLocaleDateString()}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-[17px] leading-8'>Designation</span>
            <span className='text-[17px] leading-8'>{item.designation}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-[17px] leading-8'>Job Type</span>b
            <span className='text-[17px]  leading-8'>{item.type}</span>
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
                    <orderPlaced>{item.designation}</orderPlaced>
                    <orderedContent>{new Date(item.appliedAt).toLocaleDateString()}</orderedContent>
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