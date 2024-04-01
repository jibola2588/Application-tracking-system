import React,{useState} from 'react';
import styled from 'styled-components';
import { ImFilePicture } from "react-icons/im";
import { VerticalSpacer } from '../../components/verticalSpacer';
import { CgProfile } from "react-icons/cg";
import { GiSkills } from "react-icons/gi";
import { BsPersonWorkspace } from "react-icons/bs";
import { MdCastForEducation } from "react-icons/md";
import { TfiFile } from "react-icons/tfi";
import Personal from '../../components/pages/profile/personal';
import Skills from '../../components/pages/profile/skills';
import Resume from '../../components/pages/profile/resume';
import Works from '../../components/pages/profile/work';
import Education from '../../components/pages/profile/education';



const Container = styled.div``
const Top = styled.div``
const Left = styled.div``
const Right = styled.div``
const ImageHolder = styled.div``
const Bottom = styled.div``
const Tab = styled.div``
const ContentWrapper = styled.div``
const Content = styled.div``

const Profile = () => {

  const [tab,setTab] = useState('Personal Details')

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
}

const handleTab = (value) => { 
  setTab(value)
}

const tabs = [
  { 
    title:'Personal Details',
    icon:CgProfile
  },
  { 
    title:'Skills',
    icon:GiSkills
  },
  { 
    title:'Resume',
    icon:TfiFile
  },
  { 
    title:'Education',
    icon:MdCastForEducation
  },
  { 
    title:'Experience',
    icon:BsPersonWorkspace
  }
  ]

  const [file, setFile] = useState();
  return (
    <Container className=''>
       <Top className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          <Left className='flex items-center gap-4 border border-gray-100 rounded-md py-4 pl-4'>
            <div>
      <h2>Upload Image: </h2>
      <VerticalSpacer size='10px' />
      <div>
        <label htmlFor="fileInput">
          {!file ? (
            <div> 
              <div className='w-24 h-24 rounded-full border border-[silver] flex items-center justify-center bg-gray-50 cursor-pointer'>
                <ImFilePicture className='text-gray-300' />
              </div>
              <VerticalSpacer size='6px' />
              <span className='border border-grey-50 py-1 px-3 text-xs rounded-md mt-4 cursor-pointer'>
                Choose Image
              </span>
            </div>
          ) : (
            <>
            <div className='w-24 h-24 rounded-full border border-[silver] overflow-hidden cursor-pointer'>
              <img src={file} alt='' className='w-full h-full object-cover'/>
            </div>
            <VerticalSpacer size='6px' />
            <span className='border border-grey-50 py-1 px-3 text-xs rounded-md mt-4 cursor-pointer'>
                Replace image
           </span>
          </>
          )}
        </label>
        <input
          id="fileInput"
          type="file"
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </div>

           </div>
           <div className='space-y-1 pl-5'> 
             <h3 className='font-medium text-lg'>James joe</h3>
             <h3 className='text-sm'>James@gmail.com</h3>
             <h3 className='text-sm'>07035789700</h3>
           </div>
          </Left>
          <Right className='border border-gray-100 p-4 rounded-md'>
            <div className='flex items-center justify-between'> 
              <span className='font-medium'>Current status</span>
              <span>Updated on <span className='font-medium'>11/12/12</span></span>
            </div>
            <section className='space-y-2 mt-3'> 
              <div> 
                <span className='font-medium'>Working at:</span>
                <span> Fuelmetrics</span>
              </div>
              <div> 
                <span className='font-medium'>Job role:</span>
                <span> Frontend</span>
              </div>
              <div> 
                <span className='font-medium'>Experience:</span>
                <span> 3 years</span>
              </div>
              <div> 
                <span className='font-medium'>Location:</span>
                <span> Lagos</span>
              </div>
            </section>

          </Right>
       </Top>
       <VerticalSpacer size='30px' />
       <Bottom>
        <Tab className='flex items-center gap-4'>
        { 
          tabs.map((item,index) => ( 
          <div 
          onClick = {() => setTab(item.title)}
          className={`${tab === item.title ? 'rounded-lg py-2 px-2 text-sm border border-gray-100 bg-blue-400  text-white cursor-pointer flex items-center gap-2' : 'rounded-lg py-2 px-2 text-sm border border-gray-100 cursor-pointer flex items-center gap-2' }`} key={index} > 
                <item.icon />
            <span>{item.title}</span>
          </div>
          ))
        }
        </Tab>
        <ContentWrapper className='mt-2 pt-4'>
           { tab == 'Personal Details' && <Content> 
             <Personal 
              setTab = {setTab}
             />
           </Content>
           }
           { tab == 'Skills' && <Content> 
             <Skills   setTab = {setTab} />
           </Content>
           }
           { tab == 'Resume' && <Content> 
             <Resume   setTab = {setTab} />
           </Content>
           }
           { tab == 'Education' && <Content> 
            <Education   setTab = {setTab}/>
           </Content>
           }
           { tab == 'Experience' && <Content> 
             <Works   setTab = {setTab}/>
           </Content>
           }

        </ContentWrapper>
       </Bottom>
    </Container>
  );
}

export default Profile;
