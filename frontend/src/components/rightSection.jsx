import React from 'react';
import imgRight from "../assets/svg/interview.svg";

const RightAuthScreen = () => {
  return (
    <div className="w-full h-screen bg-[#f2f2f2]">
    <div className="flex h-screen w-full items-center justify-center">
      <section className='max-w-[30rem] mx-auto'>
        <div className="w-[25rem] h-[20rem]">
          <img src={imgRight} className="w-[100%] h-[100%] object-cover" />
        </div>
        <div>
          <h3 className="font-bold mt-4 text-primary400 text-3xl text-left">
            Let's get you hired
          </h3>
          <p className='text-sm mt-2 text-primary400 '> 
          Congratulations on taking the first step towards your dream job! Our Application Tracking System (ATS) is designed to streamline your job search process and help you land that perfect opportunity.
          </p>
        </div>
      </section>
    </div>
  </div>
  );
}

export default RightAuthScreen;
