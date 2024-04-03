import { useState } from 'react';
import Button from '../../components/button';
import imgRight from '../../assets/images/lapReg.jpg'
import { useNavigate } from 'react-router-dom'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import {PiLockKeyBold} from 'react-icons/pi'
import {MdOutlineEmail} from 'react-icons/md'
import Input from '../../components/input';
import { validateData, validateInput } from '../../utils/helper';
import { toast } from 'react-toastify';
import authService from '../../services/auth-service';
import { VerticalSpacer } from '../../components/verticalSpacer';

// const data = JSON.parse(localStorage.getItem('user'));


const ForgotPassword = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
})
const [disabled, setDisabled] = useState(true)
const [loading, setLoading] = useState(false)

const handleChange = (e) => {
  const { name, value } = e.target;
  const updatedData = { ...formData, [name]: value };
  setFormData(updatedData);

  let valid = true;
  if (name === 'email') {
      valid = validateInput(name, value);
  }
  setDisabled(!valid);
};


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  console.log(formData);
  try{ 
    const response = await authService.forgotPassword(formData.email)
    if(response){ 
     setLoading(false);
         toast.success(response?.message)
         setFormData({email:''})
         setTimeout(() => { 
           navigate('/login')
         },2000)
    }
  console.log('resp is here-->',response)
  }catch(err){ 
   setLoading(false);
  } 

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
             <h3 className='text-black text-lg font-semibold text-center'>Forgot password</h3>
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
              disabled={disabled}
              loading={loading}
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
  );
}

export default ForgotPassword;
