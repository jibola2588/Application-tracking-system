import React from 'react';
import styled from 'styled-components';
import { DiAndroid } from "react-icons/di";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { HiMiniUsers } from "react-icons/hi2";
import { GrShareOption } from "react-icons/gr";
import { VscSave } from "react-icons/vsc";
import { MdChevronRight } from "react-icons/md";


const Container = styled.div``
const Wrapper = styled.div``
const Job = styled.div``
const Search = styled.input``


const Jobs = () => {

  const skills = ['Prototyping','Wireframe','Figma','Adobe XD','Design system']
  const jobs = Array.from({ length: 12 });

  return (
    <Container className='text-sm'>
      <div className='flex justify-end mb-3'> 
      <Search 
        type='text'
        className='bg-transparent border border-grey-100 rounded-md py-3 px-2 outline-none '
        placeholder='Search jobs...'
      />
      </div>
      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'> 
         { 
          jobs.map(item => ( 
            <Wrapper> 
        <Job className='border border-grey-100 rounded-md p-4 space-y-2'> 
           <section className='flex items-center justify-between'> 
             <div className='flex items-center gap-2'> 
              <DiAndroid /> 
              <span> 
              <h3 className='font-medium'>UI/UX Designer</h3>
              <p>Reddit</p>
              </span>
             </div>
             {/* <div>$ 20K</div> */}
           </section>
           <section className='flex items-center gap-2'> 
             <span className='border-r border-[silver] pr-2'>3-5 Yrs</span>
             <span className='border-r border-[silver] pr-2'>80k - 100k</span>
             <span className='flex items-center gap-1l'>
               <IoLocationOutline />
               Boston, New york
             </span>
           </section>
           <section className='space-y-2'> 
             <h3 className='font-medium'>Bachelors Degree in Mechanical/Civil Engineering. Atleast 1 year of experience</h3>
             <div className='flex items-center -ml-4 w-full flex-wrap gap-2'>  
             { 
              skills.map(skill => ( 
             <span className='pl-8'>
              <ul className='list-disc'>
                  <li className='bg-gray-100 rounded-md py-1 px-2 text-center font-medium text-sm'>{skill}</li>
              </ul>
             </span>
              ))
             }    
             </div>
           </section>
           <section className='lg:flex items-center gap-2'> 
              <div className='flex items-center gap-1'> 
                 <IoMdTime />
                 <span>6 days</span>
              </div>
              <div className='flex items-center pl-4 lg:pl-8'> 
              <ul className='list-disc'> 
              <li>
                <span className='flex items-center gap-1'> 
                   <HiMiniUsers />
                  <span>Applicants</span>
                </span>
              </li>
              </ul>    
              </div>
              <div className='pl-4 lg:pl-8'> 
                <ul className='list-disc'> 
                  <li> 
                     <span>32 days left to apply</span>
                  </li>
                </ul>
              </div>
           </section>
           <section  className='flex items-end justify-between'>
           <div className='flex items-center gap-2'> 
            <button className='py-1 px-2 border rounded-md flex items-center gap-1 cursor-pointer'>
            <span className='text-xs'>Refer Job </span>
            <MdChevronRight/>
            </button>
            <button className='bg-blue-900 py-1 px-3 rounded-md flex items-center gap-1 text-white cursor-pointer text-xs'>Apply</button>           
           </div>
           <div className='flex items-end gap-2'> 
             <div className='flex items-center gap-1 cursor-pointer'> 
             <span> <VscSave /></span>
                <span className='text-xs font-medium'>Save Job</span>
             </div>
             <div className='flex items-center gap-1 cursor-pointer'> 
             <span><GrShareOption /></span> 
             <span className='text-xs font-medium'>
              Share
            </span>
             </div>
           </div>
           </section>

        </Job>
      </Wrapper>
          ))
         }
      </section>
   
    </Container>
  );
}

export default Jobs;
