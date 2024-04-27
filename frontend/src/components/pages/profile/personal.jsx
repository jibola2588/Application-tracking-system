import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Input from '../../input';
import Axios from 'axios';
import { toast } from 'react-toastify';

const Container = styled.div``;


const userData = JSON.parse(localStorage.getItem('userDetails'));


const Personal = ({ setTab, setData, data }) => {
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({
    gender: '',
    phoneNumber:'',
    email: '',
    job: '',
    location: '',
    address: '',
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
        const applicantData = response.data.filter(item => item.personal.email === userData.email)[0];

        // console.log('result data -- ',response.data);
        setFormData({
          gender: applicantData.personal.gender || '',
          email: applicantData.personal.email || '',
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

  // useEffect(() => {
  //   const isAnyFieldEmpty = Object.values(formData).some(value => value === '');
  //   console.log('disable value -->',isAnyFieldEmpty);
  //   setDisabled(isAnyFieldEmpty);
  // }, [formData]);

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
        toast.success('Profile updated successfully!');
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
      if(error.response.status == 400){ 
        toast.error(error.response.data.message);
      }else{ 
        toast.error('Request failed');
      }
  
    }
  };

  return (
    <Container>
      <div> 
      <h3 className='text-xl mb-3'>Complete your profile</h3>
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
           <div  className='grid grid-cols-1 md:grid-cols-2 gap-7'> 
           <Input
                        value={formData.email}
                        onChange={handleChange}
                        label="Email Address"
                        id="email"
                        type="text"
                        name="email"
                        placeholder="Enter your mail"
                        customclassname='bg-transparent'
                    />
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
           <div className=' flex justify-end'> 
           <button 
           disabled={disabled}
           onClick={handleNext}
           className={` ${disabled ? `bg-gray-300 cursor-not-allowed` : 'bg-primary500 cursor-pointer' } text-white text-sm py-2 px-3  rounded-md `}>Next</button>
           </div>
        </div>
      </div>
    </Container>
  );
}

export default Personal;