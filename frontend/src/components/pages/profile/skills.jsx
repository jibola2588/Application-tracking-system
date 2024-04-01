import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { IoClose } from "react-icons/io5";

const Container = styled.div``
const List = styled.div``

const Skills = ({ setTab }) => {

 const [skill,setSkill] = useState('');
 const [data, setData] = useState([]);
 const [disabled, setDisabled] = useState(true);

 useEffect(() => {
  console.log('data is here', data);
}, [data]);

 const handleAdd = () => { 
 console.log(skill);
 setData([...data,skill])
 setSkill('')
 console.log('data is here',data)
 }

 const handleDelete = (value) => { 
  const result = data.filter(item => item !== value)
  setData(result)

 }
  return (
    <Container className=''>
       <div> 
         <h3>Please input your skills:</h3>
         <div className='w-[400px] border border-[silver] py-2 px-3 rounded-md flex gap-2 mt-2'> 
           <input 
           value={skill}
           onChange={(e) => setSkill(e.target.value)}
           placeholder='Enter your skills'
           className='flex-1 bg transparent outline-none border-none'/>
           <button 
           onClick={() => handleAdd()}
           className='bg-blue-400 text-white font-medium text-sm px-2 py-2 rounded-md'>Add
           </button>
         </div>
       </div>
       {data.length > 0 && (
         <List className='mt-3 w-[35%] h-[200px] overflow-y-auto'> 
           <ul className='space-y-2'> 
              { 
                data.map((skill, index) => ( 
                  <div
                  className='bg-gray-50 flex items-center justify-between py-[6px] px-2'
                  > 
                 <span  key={index}>{skill}</span>
                  <IoClose  onClick={() => {handleDelete(skill)}} className='cursor-pointer'/>
                  </div>
                ))
              }
           </ul>       
         </List>
       )}
       <div className='flex justify-end'> 
        <span className='flex items-center gap-3'> 
        <button 
           onClick={() =>{ setTab('Personal Details')}}
           className={`border border-primary500 text-primary500 text-sm py-2 px-3  rounded-md `}>Prev
        </button>
        <button 
           disabled={disabled}
           onClick={() =>{ setTab('Resume')}}
           className={` ${disabled ? `bg-gray-300 cursor-not-allowed` : 'bg-primary500 cursor-pointer' } text-white text-sm py-2 px-3  rounded-md `}>Next
        </button>
        </span>
       </div>
    </Container>
  );
}

export default Skills;
