import { useState } from 'react';
import imgRight from '../../assets/images/lapReg.jpg'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { VerticalSpacer } from '../../components/verticalSpacer';
import styled from 'styled-components';
import {MdOutlineEmail} from 'react-icons/md'
import Input from '../../components/input';
import Button from '../../components/button';
import { validateData, validateInput } from '../../utils/helper';


const Container = styled.div``

const ResendCode = () => {

  const navigate = useNavigate();



const [isLoading, setIsLoading] = useState(false)
const [redisabled, setReDisabled] = useState(true)


const [formData, setFormData] = useState({
  email: '',
})



const handleChange = (e) => {
const { name, value } = e.target;
const updatedData = { ...formData, [name]: value };
setFormData(updatedData);

let valid = true;
if (name === 'email') {
    valid = validateInput(name, value);
}
setReDisabled(!valid);
};


const handleResend = async (e) => {
e.preventDefault();
setIsLoading(true);
console.log(formData);
try{ 
  const response = await authService.resendCode(formData.email)
  if(response){ 
    setIsLoading(false);
       toast.success(response?.message)
       setFormData({email:''})
      setTimeout(() => { 
        SetShowResend(false)
      },1000)
  }
console.log('resp is here-->',response)
}catch(err){ 
  setIsLoading(false);
} 

}

  return (
    <Container> 
      <div className='h-screen w-full grid md:grid-cols-2'>
       <div
        className='w-full h-[100%] md:hidden'>
        <img 
        src={imgRight}
        className='w-[100%] h-[100%] object-cover'
        />
      </div>
      <section className='mt-16'>
        <div className='max-w-[400px] mx-auto'> 
        <form onSubmit={handleResend}>
           <div className='my-4'> 
             <h3 className='text-black text-lg font-semibold text-center'>Resend Activation code</h3>
             <p className='mt-2 break-words text-center px-4'>Welcome back! Please enter your mail </p>
             <VerticalSpacer size='10px' />
             <div className='space-y-4 mt-4'> 
              <div> 
                <Input
                    value={formData.email}
                    onChange={handleChange}
                    label="Email Address"
                    id="email-item"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    iconleft={MdOutlineEmail}
                    customclassname='bg-transparent'
                />
              </div>   
              </div>
              <VerticalSpacer size='10px' />
           </div>
           <div className='mt-8'> 
           <Button 
              label="Proceed"
              type='submit'
              color='primary'
              size='large'
              disabled={redisabled}
              loading={isLoading}
                />  
           </div>
          </form>
        </div>
      </section>
      <div
      className='w-full h-[100%] hidden md:block'>
        <img 
        src={imgRight}
        className='w-[100%] h-[100%] object-cover'
        />
      </div>
    </div>
    </Container>
  );
}

export default ResendCode;



