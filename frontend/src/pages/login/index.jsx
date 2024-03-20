import React, { useState } from 'react';
import Button from '../../components/button';
import imgRight from '../../assets/images/lapReg.jpg'
import { useNavigate } from 'react-router-dom'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import {PiLockKeyBold} from 'react-icons/pi'
import {MdOutlineEmail} from 'react-icons/md'
import Input from '../../components/input';
import { validateData, validateInput } from '../../utils/helper';


const Login = () => {

  const navigate = useNavigate();
  const goToRegister = () => { 
    navigate('/')
  }

  const [formData, setFormData] = useState({
    email: '',
    password:''
})
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


const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true)
  console.log(formData)
  setLoading(false)
}

  return (
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
        <form onSubmit={handleSubmit}>
           <div className='my-4'> 
             <h3 className='text-black text-lg font-semibold text-center'>Sign in</h3>
             <p className='mt-2 break-words text-center px-4'>Welcome back! Please enter your details </p>
             <div className='space-y-4 mt-4'> 
              <div> 
                {/* <label className='font-medium'>Email*</label>
                <input 
                  type='text'
                  placeholder='Enter your email'
                  className='w-full bg-transparent border border-grey-300 rounded-md px-3 py-2 outline-none mt-1'
                /> */}
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
                {/* <label className='font-medium'>Password*</label>
                <input 
                  type='text'
                  placeholder='Enter your password'
                  className='w-full bg-transparent border border-grey-300 rounded-md px-3 py-2 outline-none mt-1'
                /> */}
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
              </div>
              </div>
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
           <p className='text-sm text-[#1c0808] text-center mt-2'>Don't have an account? <span 
           onClick={goToRegister}
           className='text-primary300 font-bold cursor-pointer'>Sign up</span></p>
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