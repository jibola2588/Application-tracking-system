import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Input from '../../input';

const Container = styled.div``

const Personal = ({ setTab,  setData , data}) => {

  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({
    gender: '',
    phone:'',
    company: '',
    job: '',
    location: '',
    address:''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
  };

  useEffect(() => {
    const isAnyFieldEmpty = Object.values(formData).some(value => value === '');
    if(isAnyFieldEmpty){
      // setDisabled(isAnyFieldEmpty);
      setDisabled(true)
    }else{ 
      setDisabled(false)
    }
  }, [formData]);

  const handleNext = () => { 
    setData({...data,
    personal:formData
  }
    )
    console.log('data is here',data);
    setTab('Skills')
  }

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
                        value={formData.phone}
                        onChange={handleChange}
                        label="Phone Number"
                        id="phone"
                        type="text"
                        name="phone"
                        placeholder="Enter your phone number"
                        customclassname='bg-transparent'
                    />
           </div>
           <div  className='grid grid-cols-1 md:grid-cols-2 gap-7'> 
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
