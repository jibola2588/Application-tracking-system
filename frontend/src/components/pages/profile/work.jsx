import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '../../input';
import { IoIosClose } from "react-icons/io";
import Axios from 'axios';
import { toast } from 'react-toastify';

const Container = styled.div``;

const userData = JSON.parse(localStorage.getItem('userDetails'));

const Work = ({ setTab, data, setData }) => {
  const [disabled, setDisabled] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [workArray, setWorkArray] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    desc: '',
    startD: '',
    endD: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
  };

  const handleWork = () => {
    const id = Math.random() * 3000; // Generate a unique id
    setWorkArray((prevArray) => [
      ...prevArray,
      { ...formData, id: id },
    ]);
    setFormData({
      name: '',
      role: '',
      desc: '',
      startD: '',
      endD: '',
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const userId = userData._id;
      // const response = await Axios.get(`http://localhost:8000/applicants/${userId}`);
      const response = await Axios.get('http://localhost:8000/profile/applicants');
      if (response.data.length > 0) {
        // const applicantData = response.data[0];
        const applicantData = response.data.filter(item => item.personal.email === userData.email)[0];
        setWorkArray(applicantData.workData || []);
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
    setIsDisabled(workArray.length === 0);
  }, [workArray.length]);

  const handleDelete = (id) => {
    setWorkArray(workArray.filter((item) => item.id !== id));
  };

  const handleSubmit = async () => {
    try {
      const response = await Axios.get('http://localhost:8000/profile/applicants');
      if (response.data.length > 0) {
        const applicantId = response.data[0]._id;
        await Axios.put(`http://localhost:8000/profile/applicants/${applicantId}`, { workData: workArray });
        toast.success('Experience updated successfully!');
      } else {
        await Axios.post('http://localhost:8000/profile/applicants', {
          user: userData._id, 
          workData: workArray });
      }
      setData({ ...data, workData: workArray });
      setTab('Personal Details');
    } catch (error) {
        toast.error('Request failed');
      console.error('Error:', error);
    }
  };


  return (
    <Container>
      <div>
        <h3 className='text-xl mb-3'>Work Experience</h3>
        <div className='space-y-5'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>
            <Input
              value={formData.name}
              onChange={handleChange}
              label="Company name"
              id="name"
              type="text"
              name="name"
              placeholder="Enter the company name"
              customclassname='bg-transparent'
            />
            <Input
              value={formData.role}
              onChange={handleChange}
              label="Role"
              id="role"
              type="text"
              name="role"
              placeholder="Enter your role"
              customclassname='bg-transparent'
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>
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
                placeholder="Write the job description"
                className='border border-[#f1f5f8] outline-none p-4 rounded-md'
              >
              </textarea>
            </div>
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
                onClick={() => handleWork()}
                className={disabled ? 'bg-primary200 text-white py-2 px-3 rounded-md text-center w-[16rem] cursor-not-allowed' : 'bg-primary500 text-white py-2 px-3 rounded-md text-center w-[16rem] cursor-pointer'}>Add</button>
            </div>
          </div>
        </div>
      </div>

      <div className='space-y-4 mt-10'>
        {workArray.map((item, index) => (
          <section className='border border-gray-100 rounded-md w-[50%] p-4 relative' key={index}>
            <span className='absolute right-0 top-0'>
              <IoIosClose onClick={() => handleDelete(item.id)} />
            </span>
            <div className='flex gap-1'>
              <span className='font-medium text-sm'>Company name :</span>
              <span>{item.name}</span>
            </div>
            <div className='flex gap-1'>
              <span className='font-medium text-sm'>Role :</span>
              <span>{item.role}</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='font-medium text-sm'>Description :</span>
              <span className='word-break'>{item.desc}</span>
            </div>
            <div className='flex gap-1'>
              <span className='font-medium text-sm'>Start date :</span>
              <span>{item.startD}</span>
            </div>
            <div className='flex gap-1'>
              <span className='font-medium text-sm'>End date :</span>
              <span>{item.endD}</span>
            </div>
          </section>
        ))}
      </div>

      <div className='flex justify-end'>
        <span className='flex items-center gap-3'>
          <button
            onClick={() => { setTab('Education') }}
            className={`border border-primary500 text-primary500 text-sm py-2 px-3  rounded-md `}>Prev
          </button>
          <button
            onClick={handleSubmit}
            disabled={isDisabled}
            className={` ${isDisabled ? `bg-gray-300 cursor-not-allowed` : 'bg-primary500 cursor-pointer'} text-white text-sm py-2 px-3  rounded-md `}>Submit
          </button>
        </span>
      </div>

      {workArray.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Work Summary</h3>
          {workArray.map((item, index) => (
            <div key={index} className="mb-2">
              <p className="font-semibold">{item.name}</p>
              <p>{item.role}</p>
              <p>{item.desc}</p>
              <p>{item.startD} - {item.endD}</p>
            </div>
          ))}
        </div>
      )}

    </Container>
  );
}

export default Work;
