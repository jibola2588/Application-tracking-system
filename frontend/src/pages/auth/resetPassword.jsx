import { useState,useEffect } from 'react';
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
import LogoComponent from '../../components/logo';
import RightAuthScreen from '../../components/rightSection';



const ResetPassword = () => {

  const navigate = useNavigate();
  const goToRegister = () => { 
    navigate('/signup')
  }

  const [formData, setFormData] = useState({
    pwd: '',
    comPwd:''
})
const [disabled, setDisabled] = useState(true)
const [loading, setLoading] = useState(false)
const [match, setMatch] = useState(false)

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

useEffect(() => {
 if(!(formData.pwd && formData.comPwd)){
    setDisabled(true)
    return
 }
 
 if(formData.pwd === formData.comPwd){ 
    setDisabled(false)
    setMatch(true)
 }else{ 
    setDisabled(true)
    setMatch(false)
 }
}, [formData.comPwd]);


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  console.log(formData);
  try{ 
    const response = await authService.resetPassword(formData)
    if(response){ 
     setLoading(false);
     setFormData({pwd:'',comPwd:''})
         toast.success(response?.message)
         setTimeout(() => { 
           navigate('/login')
         },2000)
    }
//   console.log('resp is here-->',response)
  }catch(err){ 
   setLoading(false);
  }

 
}

  return (
    <div className='h-screen w-full grid md:grid-cols-2'>
       <div
      className='w-full h-[100%] md:hidden'>
        <RightAuthScreen />
      </div>
      <section className='mt-16'>
        <div className='max-w-[400px] mx-auto'> 
        <LogoComponent />
        <form onSubmit={handleSubmit}>
           <div className='my-4'> 
             <h3 className='text-black text-lg font-semibold text-center'>Reset password</h3>
             <p className='mt-2 break-words text-center px-4'>Welcome back! Please provide your new password:</p>
             <div className='space-y-4 mt-4'> 
              <div> 
              <Input
                    value={formData.pwd}
                    onChange={handleChange}            
                    label="New Password"
                    id="password-item"
                    type="password"
                    switchtype="text"
                    name="pwd"
                    placeholder="Enter your password"
                    iconleft={PiLockKeyBold} 
                    customclassname='py-1 px-5 bg-transaprent'
                    iconright={AiFillEye}
                    iconrightswitch={AiFillEyeInvisible}
                />
                 <p className={`text-sm ${!formData.pwd.length ? ' text-[#b5b3b3]' : formData.pwd.length >= 8 ? 'text-green-400' : 'text-red-400'}`}>Must be atleast 8 characters</p>
              </div>
              <div> 
                <Input
                    value={formData.comPwd}
                    onChange={handleChange}            
                    label="Confirm password"
                    id="password-item"
                    type="password"
                    switchtype="text"
                    name="comPwd"
                    placeholder="Enter your password"
                    iconleft={PiLockKeyBold} 
                    customclassname='py-1 px-5 bg-transaprent'
                    iconright={AiFillEye}
                    iconrightswitch={AiFillEyeInvisible}
                />
              </div>
              { formData.comPwd && <span > 
             {match ?  <p className='text-sm text-green-400'>Passwords match</p>
               : <p className='text-sm text-red-400'>Passwords do not match.</p>}       
              </span> }
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

export default ResetPassword;



