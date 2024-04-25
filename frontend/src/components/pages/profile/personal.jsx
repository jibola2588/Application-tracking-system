import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Input from '../../input';
import Axios from 'axios';

const Container = styled.div``;


const userData = JSON.parse(localStorage.getItem('userDetails'));


const Personal = ({ setTab, setData, data }) => {
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({
    gender: '',
    company: '',
    job: '',
    location: '',
    address: '',
    phoneNumber: '',
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
        setFormData({
          gender: applicantData.personal.gender || '',
          company: applicantData.personal.company || '',
          job: applicantData.personal.job || '',
          location: applicantData.personal.location || '',
          address: applicantData.personal.address || '',
          phoneNumber: applicantData.personal.phoneNumber || '',
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const isAnyFieldEmpty = Object.values(formData).some(value => value === '');
    setDisabled(isAnyFieldEmpty);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
  };

  const handleNext = async () => {
    try {
      const response = await Axios.get('http://localhost:8000/profile/applicants');
      if (response.data.length > 0) {
        // Update existing profile
        const applicantId = response.data[0]._id;
        await Axios.put(`http://localhost:8000/profile/applicants/${applicantId}`, {
          personal: formData
        });
        console.log('Profile updated successfully!');
      } else {
        // Create new profile
        const newProfileResponse = await Axios.post('http://localhost:8000/profile/applicants', {
          personal: formData
        });
        console.log('Profile created successfully:', newProfileResponse.data);
      }
      setTab('Skills');
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <Container>
      <div>
        <h3 className='text-center text-lg mb-3'>Complete your profile</h3>
        <div className='space-y-5'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>
            <Input
              value={formData.gender}
              onChange={handleChange}
              label="Gender"
              id="gender"
              type="text"
              name="gender"
              placeholder="Enter your gender"
              customclassname='bg-transparent'
            />

            <Input
              value={formData.company}
              onChange={handleChange}
              label="Current Company"
              id="company"
              type="text"
              name="company"
              placeholder="Enter your company name"
              customclassname='bg-transparent'
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>
            <Input
              value={formData.job}
              onChange={handleChange}
              label="Designation"
              id="job"
              type="text"
              name="job"
              placeholder="Enter your designation"
              customclassname='bg-transparent'
            />
            <Input
              value={formData.location}
              onChange={handleChange}
              label="Location"
              id="location"
              type="text"
              name="location"
              placeholder="Enter your location"
              customclassname='bg-transparent'
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>
            <Input
              value={formData.address}
              onChange={handleChange}
              label="Address"
              id="address"
              type="text"
              name="address"
              placeholder="Enter your address"
              customclassname='bg-transparent'
            />
            <Input
              value={formData.phoneNumber}
              onChange={handleChange}
              label="Phone Number"
              id="phoneNumber"
              type="text"
              name="phoneNumber"
              placeholder="Enter your phone number"
              customclassname='bg-transparent'
            />
          </div>
          <div className=' flex justify-end'>
            <button
              disabled={disabled}
              onClick={handleNext}
              className={` ${disabled ? `bg-gray-300 cursor-not-allowed` : 'bg-primary500 cursor-pointer'} text-white text-sm py-2 px-3  rounded-md `}>Next</button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Personal;