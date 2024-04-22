import { useState } from 'react';
import Button from '../../components/button';
import { useNavigate } from 'react-router-dom'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import {PiLockKeyBold} from 'react-icons/pi'
import {MdOutlineEmail} from 'react-icons/md'
import Input from '../../components/input';
import { validateData, validateInput } from '../../utils/helper';
import { toast } from 'react-toastify';
import authService from '../../services/auth-service';
import LogoComponent from '../../components/logo';
import RightAuthScreen from '../../components/rightSection';

// const data = JSON.parse(localStorage.getItem('user'));


const Login = () => {

  const navigate = useNavigate();
  const goToRegister = () => { 
    navigate('/signup')
  }

  const [formData, setFormData] = useState({
    email: '',
    password:''})
const [disabled, setDisabled] = useState(true)
const [loading, setLoading] = useState(false)

const handleChange = (e) => {
  const { name, value } = e.target;
  const updatedData = { ...formData, [name]: value };
  setFormData(updatedData);

  let valid = true;
  if (name === 'password') {
      valid = validateInput(name, value);
  } else {
      valid = validateData(updatedData);
  }
  setDisabled(!valid);
};


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  console.log(formData);
  try {
    const response = await authService.onLogin(formData);
    if (response) {
      console.log('resp is here -->', response);
      setLoading(false);
      toast.success('Login successfully');
      localStorage.setItem("userDetails", JSON.stringify(response.body));
      sessionStorage.setItem('email', formData.email);
      setTimeout(() => {
        navigate(`/dashboard`);
      }, 2000);
    //   if(response.body.role == 'Applicant'){ 
    // // Storing email in session storage
    //   localStorage.setItem("userdbtoken", response.data.token);
    //     setTimeout(() => {
    //       navigate(`/dashboard`);
    //     }, 2000);
    //   }else{ 
    //     setTimeout(() => {
    //       navigate(`/dashboard`);
    //     }, 2000);
    //   } 
    }
    // console.log('resp is here-->', response);
    // console.log('resp is here-->', response.formData);
  } catch (err) {
    setLoading(false);
  }
}

const goToPwd = () => {
  navigate('/forgot-password')
}

  return (
    <div className='h-screen w-full grid md:grid-cols-2'>
       <div
      className='w-full h-[100%] md:hidden'>
         <RightAuthScreen />
      </div>
      <section className='mt-16'>
        <div className='max-w-[400px] mx-auto'> 
        <form onSubmit={handleSubmit}>
           <div className='my-4'> 
           <LogoComponent />
             <h3 className='text-black text-lg font-semibold text-center'>Sign in</h3>
             <p className='mt-2 break-words text-center px-4'>Welcome back! Please enter your details </p>
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
              <div> 
                <Input
                    value={formData.password}
                    onChange={handleChange}            
                    label="Password"
                    id="password-item"
                    type="password"
                    switchtype="text"
                    name="password"
                    placeholder="Enter your password"
                    iconleft={PiLockKeyBold} 
                    customclassname='py-1 px-5 bg-transaprent'
                    iconright={AiFillEye}
                    iconrightswitch={AiFillEyeInvisible}
                />
              <p className='text-sm text-[#1c0808] mt-1 text-center flex justify-end'> <span 
           onClick={goToPwd}
           className='text-primary400 font-bold cursor-pointer'>Forgot password</span></p>
              </div>
              </div>
           </div>
           <div className='mt-6'> 
           <Button 
              label="Proceed"
              type='submit'
              color='primary'
              size='large'
              disabled={disabled}
              loading={loading}
                />  
           </div>
           <p className='text-sm text-[#1c0808] text-center mt-2'>Don&apos;t have an account? <span 
           onClick={goToRegister}
           className='text-primary400 font-bold cursor-pointer'>Sign up</span></p>
           
          </form>
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



{/* <Input
value={formData.confirmPassword}
onChange={handleChange}
label="Confirm Password"
id="confirmPassword"
type="password"
switchtype="text"
name="confirmPassword"
placeholder="Confirm new password"
iconleft={MdLock}
iconright={FaRegEyeSlash}
iconrightswitch={FaRegEye}
/>  */}