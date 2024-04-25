import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import moment from 'moment';
import styled from 'styled-components';
import TablePagination from '@mui/material/TablePagination'; 
import Application from '../modals/applicants/applications';
import Axios from 'axios';

const UserData = JSON.parse(localStorage.getItem('userDetails'));

const Container = styled.div``
const Top = styled.div``
const Status = styled.div`
    color: ${(props) => {
        switch (props.type) {
            case 'pending':
                return 'orange';
            case 'completed':
                return 'green'; 
            case 'cancelled':
                return 'red'; 
            default:
                return 'black'; 
        }
    }};
    background-color: ${(props) => {
        switch (props.type) {
            case 'pending':
                return 'lightyellow'; 
            case 'completed':
                return 'lightgreen'; 
            case 'cancelled':
                return 'lightcoral';
            default:
                return 'white'; 
        }
    }};
`;

const Bottom = styled.div``

const currentDate = moment().format('YYYY-MM-DD');

export default function ApplicationsTable() {
  


    const [page, setPage] = useState(0); 
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [item,setItem] = useState(null);
    const [appliedJobs, setAppliedJobs] = useState([]);

    const onClose = () => {
        setOpen(false);
      };

      useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const userId = UserData._id; // replace with the actual user id
                const response = await Axios.get(`http://localhost:8000/appliedJob/${userId}`);
                setAppliedJobs(response.data.data);
                console.log(response, "cgfwgh");
            } catch (error) {
                console.error('Error fetching applied jobs:', error);
            }
        };
        fetchAppliedJobs();
    }, []);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (e) => { 
        setSearch(e.target.value)
        setPage(0);
    }

    const filteredJobs = appliedJobs.filter(job =>
        job.type.toLowerCase().includes(search.toLowerCase()) ||
        job.companyName.toLowerCase().includes(search.toLowerCase()) ||
        job.designation.toLowerCase().includes(search.toLowerCase()) ||
        job.status.toLowerCase().includes(search.toLowerCase())
    )

    const handleClick = (data) => {
        console.log('id is here',data);
        setOpen(true);
        setItem(data)
    }

    return (
        <Container>
        { open && item &&
        <Application 
         open={open}
         onclose={onClose}
         item={item}
        />
        }
        
            {/* <VerticalSpacer size='1rem' /> */}
            <Top className='flex justify-end'> 
                <div className='flex'> 
                    <span className='border border-silver rounded-md flex items-center gap-1 px-2 mb-2'> 
                        <CiSearch style={{color:'silver'}} />
                        <input 
                            placeholder='Search...'
                            value={search}
                            onChange={handleSearch}
                            className='border-none bg-transparent outline-none flex-1 py-2'
                        />
                    </span>
                </div>
            </Top>
            <Bottom> 
                <table className='w-full'> 
                    <thead className='bg-gray-100'>
                        <tr className='text-left'>
                            <th>Date</th>
                            <th>Company</th>
                            <th>Designation</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead> 
                    <tbody> 
                        {filteredJobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((job, index) => ( 
                            <tr key={index} className='text-left border-b border-[#e7e5e5] cursor-pointer w-full' onClick={() => handleClick(job)}> 
                                <td>{job.appliedAt}</td>
                                <td>{job.companyName}</td>
                                <td>{job.designation}</td>
                                <td>{job.type}</td>
                                <td className='flex items-center justify-between'> 
                                <Status type = {job.status} className='py-1 px-2 rounded-md'> 
                                {job.status}
                                </Status>
                                </td>
                                <td className='w-10'> 
                                <div className='border border-primary400 rounded-md py-1 px-2 text-sm'>View</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <TablePagination
                    component="div"
                    count={appliedJobs.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Bottom>
        </Container>
    );
}
