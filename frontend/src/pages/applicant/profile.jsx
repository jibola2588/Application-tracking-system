import React,{useState} from 'react';
import styled from 'styled-components';
import { ImFilePicture } from "react-icons/im";
import { VerticalSpacer } from '../../components/verticalSpacer';

const Container = styled.div``
const Top = styled.div``
const Left = styled.div``
const Right = styled.div``
const ImageHolder = styled.div``
const Bottom = styled.div``

const Profile = () => {

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
}

  const [file, setFile] = useState();
  return (
    <Container className=''>
       <Top className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          <Left className='flex items-center gap-4 border border-gray-100 rounded-md p-4'>
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
           <div className='space-y-2'> 
             <h3>James joe</h3>
             <h3>James@gmail.com</h3>
             <h3>07035789700</h3>
           </div>
          </Left>
          <Right>

          </Right>
       </Top>
       <Bottom></Bottom>
    </Container>
  );
}

export default Profile;
