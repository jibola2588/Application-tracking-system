import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../../components/input";
import { IoClose } from "react-icons/io5";
import Button from "../../components/button";
import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';


const Container = styled.div``;
const List = styled.div``

const CreateJobs = () => {
  const [disabled, setDisabled] = useState(true);
  const [skill, setSkill] = useState("");
 const [data, setData] = useState([]);
 const navigate = useNavigate();
 

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    salary: "",
    exp: "",
    qual: "",
    location: "",
    startDate: "",
    desc: "",
    skills: [],
    mode:'',
    count:'',
    deadline:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
  };

  useEffect(() => {
    const isAnyFieldEmpty = Object.values(formData).some(
      (value) => value === ""
    );
    setDisabled(isAnyFieldEmpty);
  }, [formData]);

 useEffect(() => {
  console.log('data is here', data);
}, [data]);

const handleAdd = () => {
  console.log(skill);
  setData([...data, skill]);
  setFormData({ ...formData, skills: [...formData.skills, skill] }); // Add skill to formData
  setSkill("");
  // console.log("data is here", data);
};

 const handleDelete = (value) => { 
  const result = data.filter(item => item !== value)
  setData(result)

 }

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await Axios.post(
      "http://localhost:8000/jobs/post",
      formData
    );
    
    console.log('response is here',response)
    if (response) {
      toast.success("Job posted successfully!");
      setTimeout(() => {
        navigate('/dashboard')
        console.log("Redirecting to dashboard...");
      }, 2000);
    }
  } catch (error) {
    console.error("Error posting job:", error);
    toast.error("Failed to post job. Please try again later.");
  }
};

  return (
    <Container>
      <div>
        <h3 className="text-primary400 font-medium mb-4 text-2xl">Create job details</h3>
        <section 
        className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <Input
              value={formData.title}
              onChange={handleChange}
              label="Job title"
              id="title"
              type="text"
              name="title"
              placeholder="Enter the job title"
              customclassname="bg-transparent"
            />

            <Input
              value={formData.company}
              onChange={handleChange}
              label="Company Name"
              id="company"
              type="text"
              name="company"
              placeholder="Enter your company name"
              customclassname="bg-transparent"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <Input
              value={formData.salary}
              onChange={handleChange}
              label="Salary"
              id="salary"
              type="text"
              name="salary"
              placeholder="Enter salary value"
              customclassname="bg-transparent"
            />
            <Input
              value={formData.exp}
              onChange={handleChange}
              label="Experience"
              id="exp"
              type="text"
              name="exp"
              placeholder="Enter experience level"
              customclassname="bg-transparent"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <Input
              value={formData.qual}
              onChange={handleChange}
              label="Qualification"
              id="title"
              type="=text"
              name="qual"
              placeholder="Enter qualification"
              customclassname="bg-transparent"
            />

            <Input
              value={formData.location}
              onChange={handleChange}
              label="Job location"
              id="location"
              type="text"
              name="location"
              placeholder="Enter the job location"
              customclassname="bg-transparent"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <Input
              value={formData.startDate}
              onChange={handleChange}
              label="Start date"
              id="startDate"
              type="date"
              name="startDate"
              placeholder="Enter the start date"
              customclassname="bg-transparent"
            />
            <div className="flex flex-col"> 
            <label className="text-black">Select Job type</label>
            <select 
                 value={formData.mode}
                    onChange={handleChange}
                    id="mode"
                    type='text'
                    name='mode'
               className="border border-[#f1f5f8] outline-none p-4 rounded-md w-full"> 
              <option selected className="text-[#c1b5bb]">Select job type</option>
              <option>contract</option>
              <option>Part time</option>
              <option>Full time</option>
            </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <Input
              value={formData.count}
              onChange={handleChange}
              label="Number of Applicants"
              id="count"
              type="text"
              name="count"
              placeholder="Enter applicant number"
              customclassname="bg-transparent"
            />
             <Input
              value={formData.deadline}
              onChange={handleChange}
              label="Application deadline"
              id="deadline"
              type="date"
              name="deadline"
              placeholder="Enter application deadline"
              customclassname="bg-transparent"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          <div> 
         <div> 
         <h3>Please input skills</h3>
         <div className='border border-[#f1f5f8] py-2 px-3 rounded-md flex gap-2'> 
           <input 
           value={skill}
           onChange={(e) => setSkill(e.target.value)}
           placeholder='Enter your skills'
           className='flex-1 bg transparent outline-none border-none'/>
           <button 
           onClick={() => handleAdd()}
           className='bg-primary400 text-white font-medium text-sm px-2 py-2 rounded-md'>Add
           </button>
         </div>
       </div>
       {data.length > 0 && (
         <List className='mt-3'> 
           <ul className='flex gap-1 flex-wrap'> 
              { 
                data.map((skill, index) => ( 
                  <div
                  className='bg-primary400 w-[100px] flex items-center justify-between py-[6px] px-2 text-white font-medium'
                  > 
                 <span  key={index}>{skill}</span>
                  <IoClose  onClick={() => {handleDelete(skill)}} className='cursor-pointer'/>
                  </div>
                ))
              }
           </ul>       
         </List>
       )}
         </div> 
         <div className='flex flex-col gap-[6px]'> 
                    <label>Description</label>
                    <textarea
                    value={formData.desc}
                    onChange={handleChange}
                    id="desc"
                    type='text'
                    name='desc'
                    row={'50'}
                    column={'50'}
                    placeholder="Write your job description"
                    className='border border-[#f1f5f8] outline-none p-4 rounded-md'
                    >  
                    </textarea>
         </div>        
          </div>
          <div className="flex justify-end">
          <span className="w-[12rem]"> 
          <Button 
              label="Proceed"
              type='submit'
              color='primary'
              size='large'
              disabled={false}
              // loading={isLoading}
              onClick={handleSubmit}
                />  
          </span>
          </div>
        </section> 
      </div>
    </Container>
  );
};

export default CreateJobs;
