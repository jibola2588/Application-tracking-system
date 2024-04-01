import React, { useState } from 'react';
import styled from 'styled-components';
import { FiUploadCloud } from "react-icons/fi";

const Container = styled.div``;
const Upload = styled.div`
  border: 1px dashed gray;
  border-radius: 20px;
`;

const Resume = () => {
  const [file, setFile] = useState(null);

  function handleChange(e) {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile({
        name: uploadedFile.name,
        type: uploadedFile.type,
        size: uploadedFile.size,
      });
    } else {
      setFile(null);
    }
  }

  return (
    <Container>
      <div className='max-w-lg mx-auto'>
        <label htmlFor='upload'>
          <Upload className={` ${file ? 'h-[330px]' : 'h-[200px]'}mt-6 relative`}>
            <span className='mt-10 flex justify-center'>
              <FiUploadCloud className='text-4xl' />
            </span>
            <input
              id='upload'
              type='file'
              className='absolute top-0 left-0 h-[100%] w-[100%] outline-none border-none hidden'
              onChange={handleChange}
            />
            <p className='mt-5 mb-3 text-center'>upload your resume</p>
            {file && (
              <p className='pl-32'>
                Name: {file.name}<br />
                Type: {file.type}<br />
                {/* Size: {file.size} bytes */}
              </p>
            )}
          </Upload>
        </label>
      </div>
    </Container>
  );
};

export default Resume;
