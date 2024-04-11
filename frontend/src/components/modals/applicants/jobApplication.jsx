import React, { useState } from 'react';
import { Drawer } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { VerticalSpacer } from '../../verticalSpacer';

const currentDate = moment().format('YYYY-MM-DD');


const Top = styled.div``
const Bottom = styled.div``

const ApplyForJobs = ({open,close,item}) => {


 
  return (
    <>
      <Drawer title="Job Application" onClose={close} open={open} width={800}>
        <section>
           <h3 className='text-lg'>{item.company}</h3>
           <p>{item.title}</p>
           <div> 
             yes
           </div>
        </section>
      </Drawer>
    </>
  );
};
export default ApplyForJobs;