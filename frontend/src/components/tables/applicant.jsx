import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import moment from 'moment';
import styled from 'styled-components';
import TablePagination from '@mui/material/TablePagination'; 
import Application from '../modals/hr/applications';


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

export default function ApplicantTable() {
  
    const [products, setProducts] = useState([
        {
            id:'INT23578',
            date:currentDate,
            name:'James peter',
            desg:'Frontend developer',
            status:'pending',
        },
        {
            id:'INT23578',
            date:currentDate,
            name:'James west',
            desg:'Frontend developer',
            status:'pending',
        },
        {
            id:'INT23578',
            date:currentDate,
            name:'James west',
            desg:'Frontend developer',
            status:'pending',
        },
        {
            id:'INT23578',
            date:currentDate,
            name:'James west',
            desg:'Frontend developer',
            status:'pending',
        },
        {
            id:'INT23578',
            date:currentDate,
            name:'James west',
            desg:'Frontend developer',
            status:'pending',
        },
        {
            id:'INT23578',
            date:currentDate,
            name:'James west',
            desg:'Frontend developer',
            status:'pending',
        },

      ]);

    const [page, setPage] = useState(0); 
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [item,setItem] = useState(null)

    const onClose = () => {
        setOpen(false);
      };

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

     const filteredProducts = products.filter(item =>
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.desg.toLowerCase().includes(search.toLowerCase()) ||
        item.status.toLowerCase().includes(search.toLowerCase())
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
                            <th>Applicant id</th>
                            <th>Date</th>
                            <th>Applicant name</th>
                            <th>Designation</th>
                            <th>Status</th>
                        </tr>
                    </thead> 
                    <tbody> 
                        {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => ( 
                            <tr key={index} className='text-left border-b border-[#e7e5e5] cursor-pointer' onClick={() => handleClick(item)}> 
                                <td>{item.id}</td>
                                <td>{item.date}</td>
                                <td>{item.name}</td>
                                <td>{item.desg}</td>
                                <td className='flex items-start'> 
                                <Status type = {item.status} className='py-1 px-2 rounded-md'> 
                                {item.status}
                                </Status>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <TablePagination
                    component="div"
                    count={products.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Bottom>
        </Container>
    );
}
