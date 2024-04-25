import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '../../input';
import { IoClose } from "react-icons/io5";
import Axios from 'axios';

const Container = styled.div``;

// const userData = JSON.parse(localStorage.getItem('userDetails'));


const Education = ({ setTab, setData, data }) => {
  const [disabled, setDisabled] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [educationArray, setEducationArray] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    qual: '',
    startD: '',
    endD: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const userId = userData._id;
      // const response = await Axios.get(`http://localhost:8000/applicants/${userId}`);
      const response = await Axios.get('http://localhost:8000/profile/applicants');
      if (response.data.length > 0) {
        const applicantData = response.data[0];
        setEducationArray(applicantData.schoolData || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const isAnyFieldEmpty = Object.values(formData).some(value => value === '');
    setDisabled(isAnyFieldEmpty);
  }, [formData]);

  useEffect(() => {
    setIsDisabled(educationArray.length === 0);
  }, [educationArray.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSchool = () => {
    setEducationArray([...educationArray, { ...formData, id: Math.random() * 3000 }]);
    setFormData({
      name: '',
      course: '',
      qual: '',
      startD: '',
      endD: '',
    });
  };

  const handleDelete = (id) => {
    const result = educationArray.filter(item => item.id !== id);
    setEducationArray(result);
  };

  const handleNext = async () => {
    try {
      const response = await Axios.get('http://localhost:8000/profile/applicants');
      if (response.data.length > 0) {
        const applicantId = response.data[0]._id;
        await Axios.put(`http://localhost:8000/profile/applicants/${applicantId}`, { schoolData: educationArray });
      } else {
        await Axios.post('http://localhost:8000/profile/applicants', { schoolData: educationArray });
      }
      setData({ ...data, schoolData: educationArray });
      setTab('Experience');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <div>
        <h3 className='text-xl mb-3'>Education section</h3>
        <div className='space-y-5'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>
            <Input
              value={formData.name}
              onChange={handleChange}
              label="School name"
              id="name"
              type="text"
              name="name"
              placeholder="Enter your school name"
              customclassname='bg-transparent'
            />
            <Input
              value={formData.course}
              onChange={handleChange}
              label="course"
              id="course"
              type="text"
              name="course"
              placeholder="Enter your course"
              customclassname='bg-transparent'
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>
            <Input
              value={formData.qual}
              onChange={handleChange}
              label="Qualification"
              id="qual"
              type="text"
              name="qual"
              placeholder="Enter your qualification"
              customclassname='bg-transparent'
            />
            <Input
              value={formData.startD}
              onChange={handleChange}
              label="Start date"
              id="startD"
              type="date"
              name="startD"
              placeholder="Enter the start date"
              customclassname='bg-transparent'
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>
            <Input
              value={formData.endD}
              onChange={handleChange}
              label="End date"
              id="endD"
              type="date"
              name="endD"
              placeholder="Enter the end date"
              customclassname='bg-transparent'
            />
            <div className='flex items-end justify-start'>
              <button
                onClick={handleSchool}
                className={disabled ? 'bg-primary200 text-white py-2 px-3 rounded-md text-center w-[16rem] cursor-not-allowed' : 'bg-primary500 text-white py-2 px-3 rounded-md text-center w-[16rem] cursor-pointer'}>Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='space-y-4 mt-10'>
        {educationArray.map((item, index) => (
          <section className='border border-gray-100 rounded-md w-[50%] p-4 relative' key={index}>
            <div className='flex gap-1'>
              <span className='font-medium text-sm'>School name :</span>
              <span>{item.name}</span>
            </div>
            <div className='flex gap-1'>
              <span className='font-medium text-sm'>Course :</span>
              <span>{item.course}</span>
            </div>
            <div className='flex gap-1'>
              <span className='font-medium text-sm'>Qualification :</span>
              <span>{item.qual}</span>
            </div>
            <div className='flex gap-1'>
              <span className='font-medium text-sm'>Start date :</span>
              <span>{item.startD}</span>
            </div>
            <div className='flex gap-1'>
              <span className='font-medium text-sm'>End date :</span>
              <span>{item.endD}</span>
            </div>
            <IoClose onClick={() => handleDelete(item.id)} className='absolute top-2 right-3 cursor-pointer' />
          </section>
        ))}
      </div>

      <div className='flex justify-end'>
        <span className='flex items-center gap-3'>
          <button
            onClick={() => setTab('Resume')}
            className={`border border-primary500 text-primary500 text-sm py-2 px-3  rounded-md `}>Prev
          </button>
          <button
            disabled={isDisabled}
            onClick={handleNext}
            className={` ${isDisabled ? `bg-gray-300 cursor-not-allowed` : 'bg-primary500 cursor-pointer'} text-white text-sm py-2 px-3  rounded-md `}>Next
          </button>
        </span>
      </div>

      {educationArray.length > 0 && (
        <div className="border border-gray-200 rounded-md p-4 mt-6">
          <h3 className="text-lg font-medium mb-2">Education Summary</h3>
          {educationArray.map((item, index) => (
            <div key={index} className="mb-2">
              <p className="font-semibold">{item.name}</p>
              <p>{item.course}</p>
              <p>{item.qual}</p>
              <p>{item.startD} - {item.endD}</p>
            </div>
          ))}
        </div>
      )}

    </Container>
  );
}

export default Education;
