import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { IoClose } from "react-icons/io5";

const Container = styled.div``
const List = styled.div``

const Skills = ({ setTab,setData,data }) => {

 const [skill,setSkill] = useState('');
 const [skillData, setSkillData] = useState([]);
 const [disabled, setDisabled] = useState(true);
 const [isDisabled, setIsDisabled] = useState(true);

 useEffect(() => {
  // console.log('data is here', skillData);
  if(skillData.length){
    setDisabled(false)
  }else{ 
    setDisabled(true)
  }
}, [skillData]);

 const handleAdd = () => { 
 console.log(skill);
 setSkillData([...skillData,skill])
 setSkill('')
//  console.log('data is here',skillData)
 }

 const handleDelete = (value) => { 
  const result = skillData.filter(item => item !== value)
  setSkillData(result)
 }

 useEffect(() => { 
  if(skill){
    setIsDisabled(false)
  } else{
    setIsDisabled(true) 
  }
 },[skill])

 const handleNext = () => { 
  setData({ 
    ...data,
    skills:skillData
  })
  console.log('skills',data);
  setTab('Resume')
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
           disabled={isDisabled}
           onClick={() => handleAdd()}
           className={isDisabled ? 'bg-primary200 cursor-not-allowed text-white font-medium text-sm px-2 py-2 rounded-md' :'bg-primary400 text-white font-medium text-sm px-2 py-2 rounded-md'}>Add
           </button>
         </div>
       </div>
       {skillData.length > 0 && (
        <List className='mt-3 max-w-[400px]'> 
           <ul className='flex gap-1 flex-wrap'> 
              { 
                skillData.map((skill, index) => ( 
                  <div
                  key={index}
                  className='bg-primary400 w-[180px] flex items-center justify-between py-[6px] px-2 text-white font-medium'
                  > 
                 <span>{skill}</span>
                  <IoClose  
                  onClick={() => {handleDelete(skill)}} className='cursor-pointer'/>
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
           className={`border border-primary400 text-primary400 text-sm py-2 px-3  rounded-md `}>Prev
        </button>
        <button 
           disabled={disabled}
           onClick={handleNext}
           className={` ${disabled ? `bg-gray-300 cursor-not-allowed` : 'bg-primary400 cursor-pointer' } text-white text-sm py-2 px-3  rounded-md `}>Next
        </button>
        </span>
       </div>
    </Container>
  );
}

export default Skills;
