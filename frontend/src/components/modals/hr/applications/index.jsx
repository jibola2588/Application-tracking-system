import React, { useState } from 'react';
import { Drawer } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { VerticalSpacer } from '../../../verticalSpacer';
import Axios from "axios";

const currentDate = moment().format('YYYY-MM-DD');




const Top = styled.div``
const Center = styled.div``
const Bottom = styled.div``

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  background-color: ${(props) => props.backgroundColor || "transparent"};
  color: ${(props) => props.color || "#333"};
  border: 1px solid ${(props) => props.borderColor || "#ccc"};
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  &:hover {
    background-color: ${(props) => props.hoverBackgroundColor || "#f5f5f5"};
    color: ${(props) => props.hoverColor || "#333"};
    border-color: ${(props) => props.hoverBorderColor || "#ccc"};
  }
`;

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
                return '#D2FCD2'; 
            case 'rejected':
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
const Application = ({open,onclose,item,setAppliedJobs}) => {

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
 
  const handleScheduleInterview = async (id) => {
    try {
      await Axios.put(`http://localhost:8000/appliedJob/schedule/${id}`, {
        interviewDate: moment().add(7, 'days').format("YYYY-MM-DD"), 
      });
      console.log("Interview scheduled for applicant with ID:", id);
      const response = await Axios.get(`http://localhost:8000/appliedJob/list`);
      setAppliedJobs(response.data);
      onclose();
      // setShowSchedulePopup(false);
    } catch (error) {
      console.error("Error scheduling interview:", error);
    }
  };
  
  const handleReject = async (id) => {
    try {
      await Axios.put(`http://localhost:8000/appliedJob/reject/${id}`);
      console.log("Applicant rejected with ID:", id);
      const response = await Axios.get(`http://localhost:8000/appliedJob/list`);
      setAppliedJobs(response.data);
      onclose();
    } catch (error) {
      console.error("Error rejecting applicant:", error);
    }
  };

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
            <span className='text-[17px]  leading-8'>{new Date(item.appliedAt).toLocaleDateString()}</span>
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
          <Center> 
          <ActionButtons className='mt-8'>
  <Button
    backgroundColor="#4CAF50"
    color="#FFF"
    onClick={() => handleScheduleInterview(item._id)}
    disabled={item.status === "rejected"}
  >
    Schedule Interview
  </Button>
  <Button
    backgroundColor="#f44336"
    color="#FFF"
    onClick={() => handleReject(item._id)}
    disabled={item.status === "rejected"}
  >
    Reject
  </Button>
</ActionButtons>
          </Center>
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