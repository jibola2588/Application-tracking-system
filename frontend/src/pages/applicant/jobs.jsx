import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DiAndroid } from "react-icons/di";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { HiMiniUsers } from "react-icons/hi2";
import { GrShareOption } from "react-icons/gr";
import { VscSave } from "react-icons/vsc";
import { MdChevronRight } from "react-icons/md";
import { useNavigate } from "react-router";
import axios from 'axios';
import JobModal from '../../components/modals/applicants/job'

const Container = styled.div``
const Wrapper = styled.div``
const Job = styled.div``
const Search = styled.input``


const Jobs = () => {
  const navigate = useNavigate();
  const [open,setOpen] = useState(false);
  const [data,setData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/jobs/get'); 
        setJobs(response.data);
        localStorage.setItem("jobDetails", JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);



  const handleJob = (item) => { 
    setData(item)
    setOpen(true)
  }

  const handleChange = (e) => { 
   setQuery(e.target.value)
  }

  const filteredProducts = jobs.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.company.toLowerCase().includes(query.toLowerCase())
)
  const skills = ['Prototyping', 'Wireframe', 'Figma', 'Adobe XD', 'Design system'];

  return (
    <Container className='text-sm'>
   {open && data && <JobModal 
  item = {data}
  open = {open}
  onclose = {() => setOpen(false)}
   />}
      <div className='flex justify-end mb-3'>
        {/* <button className='bg-blue-900 py-1 px-3 text-white rounded-md flex items-center gap-1 mr-4 *:text-white cursor-pointer text-xs'
          onClick={() => {
            navigate('/dashboard/postJobs')
            console.log('jobPosting')
          }}
        >Create Job postings</button> */}

        <Search
          type='text'
          value={query}
          onChange={handleChange}
          className='bg-transparent border border-grey-100 rounded-md py-3 px-2 outline-none '
          placeholder='Search jobs...'
        />
      </div>
      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {
          filteredProducts.map(job => (
            <Wrapper key={job._id} onClick={() => handleJob(job)}>
              <Job className='border border-grey-100 rounded-md p-4 space-y-2 shadow-sm cursor-pointer'>
                <section className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    {/* <DiAndroid /> */}
                    <span>
                      <h3 className='font-medium'>{job.title}</h3>
                      <p>{job.company}</p>
                    </span>
                  </div>
                </section>
                {/* <section className='flex items-center gap-2'>
  <span className='border-r border-[silver] pr-2'>{job.experience}</span>
  <span className='border-r border-[silver] pr-2'>{job.salary}</span>
  <span className='flex items-center gap-1'>
    <IoLocationOutline />
    {job.locations.map((location, index) => (
      <span key={index}>{location}</span>
    ))}
  </span>
</section> */}
{/* <section className='space-y-2'>
  <h3 className='font-medium'>{job.qualifications}</h3>
  <div className='flex items-center -ml-4 w-full flex-wrap gap-2'>
    {skills.map((skill, index) => (
      <span key={index} className='pl-8'>
        <ul className='list-disc'>
          <li className='bg-gray-100 rounded-md py-1 px-2 text-center font-medium text-sm'>{skill}</li>
        </ul>
      </span>
    ))}
  </div>
</section> */}
<section> 
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
</section>
{/* <section className='lg:flex items-center gap-2'>
  <div className='flex items-center gap-1'>
    <IoMdTime />
    <span>{job.timePosted}</span>
  </div>
  <div className='flex items-center pl-4 lg:pl-8'>
    <ul className='list-disc'>
      <li>
        <span className='flex items-center gap-1'>
          <HiMiniUsers />
          <span>{job.applicantsCount} Applicants</span>
        </span>
      </li>
    </ul>
  </div>
  <div className='pl-4 lg:pl-8'>
    <ul className='list-disc'>
      <li>
        <span>{job.daysLeft} days left to apply</span>
      </li>
    </ul>
  </div>
</section> */}
{/* <section  className='flex items-end justify-between'>
           <div className='flex items-center gap-2'> 
            <button className='py-1 px-2 border rounded-md flex items-center gap-1 cursor-pointer'>
            <span className='text-xs'>Refer Job </span>
            <MdChevronRight/>
            </button>
            <button className='bg-blue-900 py-1 px-3 rounded-md flex items-center gap-1 text-white cursor-pointer text-xs'>Apply</button>           
           </div>
           <div className='flex items-end gap-2'> 
             <div className='flex items-center gap-1 cursor-pointer'> 
             <span> <VscSave /></span>
                <span className='text-xs font-medium'>Save Job</span>
             </div>
             <div className='flex items-center gap-1 cursor-pointer'> 
             <span><GrShareOption /></span> 
             <span className='text-xs font-medium'>
              Share
            </span>
             </div>
           </div>
           </section> */}
  <section className='flex justify-between items-end'> 
    {/* <button className='bg-[#18425D] py-2 px-3 rounded-md flex items-center text-white'>Apply</button> */}
    <span className='bg-[#d8ebf6] rounded-md py-[5px] px-2 flex items-center text-[#18425D] font-medium'>Remote</span>
    <span>{job.locations}</span>
  </section>
              </Job>
            </Wrapper>
          ))
        }


      </section>

    </Container>
  );
}

export default Jobs;
