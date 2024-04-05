import { useState } from 'react';
import imgRight from '../../../assets/images/lapReg.jpg'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import PinCode from "react-code-input"
import './index.css'
import { VerticalSpacer } from '../../../components/verticalSpacer';
import Button from '../../../components/button';
import LogoComponent from '../../../components/logo';

const data = JSON.parse(localStorage.getItem('user'));


const Login = () => {

  const navigate = useNavigate();


const [disabled, setDisabled] = useState(true)
const [loading, setLoading] = useState(false)
const [pinCode, setPinCode] = useState('');
const [showResend,SetShowResend] = useState(false)


const goToResend = () => { 
  navigate('/resend-code')
}
// Axios.defaults.withCredentials = true;
const handleSubmit = (e) => {
  e.preventDefault();


  toast.success('Login successful!')
        setTimeout(() => { 
          navigate('/dashboard')
        },2000) 
  setLoading(false);

}

  return (
    <div className='h-screen w-full grid md:grid-cols-2'>
       <div
      className='w-full h-[100%] md:hidden'>
        <RightAuthScreen />
      </div>
      <section className='mt-24'>

        <div className='max-w-[500px] mx-auto h-[400px] border border-gray-50 rounded-md shadow py-8 px-10'> 
        <LogoComponent />
        <VerticalSpacer size='15px' />
        <h3 className='text-black text-lg font-semibold text-center'>Account Verfication</h3>
        <VerticalSpacer size='5px' />
             <p className='break-words text-center px-4'>Enter the 6 digit pin sent to your mail.</p>
             <VerticalSpacer size='25px' />
        <form onSubmit={handleSubmit}>
        <div className='flex justify-center'> 
          <PinCode 
           type='text' fields={6}
           autoFocus
          onChange={(value) => setPinCode(value)} 
           />
        </div>
           <div className='mt-8'> 
           <Button 
              label="Proceed"
              type='submit'
              color='primary'
              size='large'
              disabled={disabled}
              loading={loading}
                />  
           </div>
          </form>
          <p className='text-sm text-[#1c0808] text-center mt-2'>Did&apos;t receive any pin? <span 
           onClick={goToResend}
           className='text-primary300 font-bold cursor-pointer'>Resend pin</span></p>
        </div>
      </section>
      <div
      className='w-full h-[100%] hidden md:block'>
        <RightAuthScreen />
      </div>
    </div>
  );
}

export default Login;



