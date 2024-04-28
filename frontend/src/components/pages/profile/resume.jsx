import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiUploadCloud } from "react-icons/fi";
import { VerticalSpacer } from '../../verticalSpacer';
import Axios from 'axios';
import { toast } from 'react-toastify';

const userData = JSON.parse(localStorage.getItem('userDetails'));



const Container = styled.div``;
const Upload = styled.div`
  border: 1px dashed gray;
  border-radius: 20px;
`;

const Resume = ({setTab,data,setData}) => {
  const [file, setFile] = useState(null);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);


  function handleChange(e) {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile({
        name: uploadedFile.name,
        type: uploadedFile.type,
        size: uploadedFile.size,
      });
    } else {
      setFile(null);
    }
  }

  useEffect(() => {
    if(file){
      setDisabled(false)
    }else{
      setDisabled(true)
    }
  })

  const fetchData = async () => {
    try {
      const response = await Axios.get('http://localhost:8000/profile/applicants');
      if (response.data.length > 0) {
        // const applicantData = response.data[0];
        const applicantData = response.data.filter(item => item.personal.email === userData.email)[0];
        // console.log(applicantData, 'applicant data is here');

        setFile(applicantData.resume || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleNext = async () => {
    try {
      const response = await Axios.get('http://localhost:8000/profile/applicants');
      if (response.data.length > 0) {
        const applicantId = response.data[0]._id;
        await Axios.put(`http://localhost:8000/profile/applicants/${applicantId}`, {
        resume: file
        });
        console.log('Skills updated successfully!');
        toast.success('Resume updated successfully!');
      } else {
        const newProfileResponse = await Axios.post('http://localhost:8000/profile/applicants', {
          resume: file
        });
        console.log('Skills created successfully:', newProfileResponse.data);
      }
      setData({ ...data, resume: file });
      setTab('Education')
    console.log('data is here',data);
    } catch (error) {
        toast.error('Request failed');
      console.error('Failed to update skills:', error);
    }
  };

  return (
    <Container>
    <VerticalSpacer size='6rem'/>
      <div className='max-w-lg mx-auto'>
        <label htmlFor='upload'>
          <Upload className={` ${file ? 'h-[330px]' : 'h-[200px]'}mt-6 relative`}>
            <span className='mt-10 flex justify-center'>
              <FiUploadCloud className='text-4xl' />
            </span>
            <input
              id='upload'
              type='file'
              className='absolute top-0 left-0 h-[100%] w-[100%] outline-none border-none hidden'
              onChange={handleChange}
            />
            <p className='mt-5 mb-3 text-center'>upload your resume</p>
            {file && (
              <p className='pl-32'>
                Name: {file.name}<br />
                Type: {file.type}<br />
                Size: {file.size} bytes
              </p>
            )}
          </Upload>
        </label>
      </div>
      <div className='flex justify-end'> 
        <span className='flex items-center gap-3'> 
        <button 
           onClick={() =>{ setTab('Skills')}}
           className={`border border-primary500 text-primary500 text-sm py-2 px-3  rounded-md `}>Prev
        </button>
        <button 
           disabled={disabled}
           onClick={handleNext}
           className={` ${disabled ? `bg-gray-300 cursor-not-allowed` : 'bg-primary500 cursor-pointer' } text-white text-sm py-2 px-3  rounded-md `}>Next
        </button>
        </span>
       </div>
    </Container>
  );
};

export default Resume;
