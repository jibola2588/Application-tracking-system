import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PinCode from "react-code-input";
import './index.css';
import { VerticalSpacer } from '../../../components/verticalSpacer';
import Button from '../../../components/button';
import LogoComponent from '../../../components/logo';
import RightAuthScreen from '../../../components/rightSection';
import Axios from "axios";
import { toast } from 'react-toastify';

const Login = () => {

  
const [disabled, setDisabled] = useState(true)
const [loading, setLoading] = useState(false)
const [pinCode, setPinCode] = useState('');
const [showResend,SetShowResend] = useState(false)

  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const goToResend = async () => {
    const userEmail = sessionStorage.getItem('email');
    if (!userEmail) {
      toast.error("User email not found");
      return;
    }

    const data = { otp, email: userEmail };
    try {
      const response = await Axios.post("http://localhost:8000/auth/send-otp", data);
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.response.data.error);
      }
    } catch (error) {
      toast.error("An error occurred while resending OTP");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp === "") {
      toast.error("Enter Your OTP");
    } else if (!/^\d{6}$/.test(otp)) {
      toast.error("Enter Valid OTP (6 digits)");
    } else {
      const userEmail = sessionStorage.getItem('email');
      if (!userEmail) {
        toast.error("User email not found");
        return;
      }

      const data = { otp, email: userEmail };
      try {
        const response = await Axios.post("http://localhost:8000/auth/verify-login", data);
        if (response.status === 200) {
          localStorage.setItem("userdbtoken", response.data.token);
          toast.success(response.data.success);
          setTimeout(() => navigate("/userDetails"),
          // setTimeout(() => navigate("/dashboard"),
          
          5000);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("An error occurred while verifying login");
        console.error(error);
      }
    }
  };





// const goToResend = () => { 
//   navigate('/resend-code')
// }
// Axios.defaults.withCredentials = true;
// const handleSubmit = (e) => {
//   e.preventDefault();


//   toast.success('Login successful!')
//         setTimeout(() => { 
//           navigate('/login')
//         },2000) 
//   setLoading(false);

// }

  return (
    <div className='h-screen w-full grid md:grid-cols-2'>
      {/* Left section */}
      <section className='mt-24'>
        <div className='max-w-[500px] mx-auto h-[400px] border border-gray-50 rounded-md shadow py-8 px-10'> 
          <LogoComponent />
          <VerticalSpacer size='15px' />
          <h3 className='text-black text-lg font-semibold text-center'>Account Verification</h3>
          <VerticalSpacer size='5px' />
          <p className='break-words text-center px-4'>Enter the 6-digit pin sent to your email.</p>
          <VerticalSpacer size='25px' />
          <form onSubmit={handleSubmit}>
            <div className='flex justify-center'> 
              <PinCode 
                type='text' fields={4}
                autoFocus
                onChange={(value) => setOtp(value)} 
              />
            </div>
            <div className='mt-8'> 
              <Button 
                label="Proceed"
                type='submit'
                color='primary'
                size='large'
              />  
            </div>
          </form>
          <p className='text-sm text-[#1c0808] text-center mt-2'>
            Didn't receive the pin? 
            <span 
              onClick={goToResend}
              className='text-primary400 font-bold cursor-pointer'>Resend pin
            </span>
          </p>
        </div>
      </section>

      {/* Right section */}
      <div className='w-full h-[100%] hidden md:block'>
        <RightAuthScreen />
      </div>
    </div>
  );
};

export default Login;