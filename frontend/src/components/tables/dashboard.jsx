import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { MdOutlineDriveFileMoveRtl } from "react-icons/md";
import { VerticalSpacer } from '../verticalSpacer';
import styled from 'styled-components';
import TablePagination from '@mui/material/TablePagination'; // Import TablePagination

const Container = styled.div``
const Top = styled.div``
const Bottom = styled.div``

export default function DashboardTable() {
    const [products, setProducts] = useState([
        {
            cName:'Interswitch',
            cType:'Fintech',
            desg:'Frontend developer',
            intName:'James west',
            meetLnk:'https://meet.google.com/wnk-udmt-gmk'
        },
        {
            cName:'Google',
            cType:'Logistics',
            desg:'Backend developer',
            intName:'John doe',
            meetLnk:'https://meet.google.com/wnk-udmt-gmk'
        },
        {
            cName:'Futterwave',
            cType:'Fintech',
            desg:'UI/UX designer',
            intName:'Mary soft',
            meetLnk:'https://meet.google.com/wnk-udmt-gmk'
        },
        {
            cName:'Goldmansach',
            cType:'Fintech',
            desg:'Project manager',
            intName:'Vindi smart',
            meetLnk:'https://meet.google.com/wnk-udmt-gmk'
        },
        {
            cName:'Jumia',
            cType:'Ecommerce',
            desg:'Product manager',
            intName:'Bolaji lateef',
            meetLnk:'https://meet.google.com/wnk-udmt-gmk'
        },
        {
            cName:'Amazon',
            cType:'Fintech',
            desg:'Cloud engineer',
            intName:'Loe brown',
            meetLnk:'https://meet.google.com/wnk-udmt-gmk'
        },
        {
            cName:'Google',
            cType:'Logistics',
            desg:'Backend developer',
            intName:'John doe',
            meetLnk:'https://meet.google.com/wnk-udmt-gmk'
        },
        {
            cName:'Futterwave',
            cType:'Fintech',
            desg:'UI/UX designer',
            intName:'Mary soft',
            meetLnk:'https://meet.google.com/wnk-udmt-gmk'
        },
        {
            cName:'Goldmansach',
            cType:'Fintech',
            desg:'Project manager',
            intName:'Vindi smart',
            meetLnk:'https://meet.google.com/wnk-udmt-gmk'
        },
        {
            cName:'Jumia',
            cType:'Ecommerce',
            desg:'Product manager',
            intName:'Bolaji lateef',
            meetLnk:'https://meet.google.com/wnk-udmt-gmk'
        },
        {
            cName:'Amazon',
            cType:'Fintech',
            desg:'Cloud engineer',
            intName:'Loe brown',
            meetLnk:'https://meet.google.com/wnk-udmt-gmk'
        },
      ]);

    const [page, setPage] = useState(0); // Current page
    const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container>
            {/* <VerticalSpacer size='1rem' /> */}
            <Top className='flex justify-end'> 
                <div className='flex'> 
                    <span className='border border-silver rounded-md flex items-center gap-1 px-2 mb-2'> 
                        <CiSearch style={{color:'silver'}} />
                        <input 
                            placeholder='Search...'
                            className='border-none bg-transparent outline-none flex-1 py-2'
                        />
                    </span>
                </div>
            </Top>
            <Bottom> 
                <table className='w-full'> 
                    <thead className='bg-gray-100'>
                        <tr className='text-left'>
                            <th>Company Name</th>
                            <th>Company Type</th>
                            <th>Designation</th>
                            <th>Interviewer Name</th>
                            <th>Meeting Link</th>
                        </tr>
                    </thead> 
                    <tbody> 
                        {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => ( 
                            <tr key={index} className='text-left border-b border-[#e7e5e5]'> 
                                <td>{item.cName}</td>
                                <td>{item.cType}</td>
                                <td>{item.desg}</td>
                                <td>{item.intName}</td>
                                <td>{item.meetLnk}</td>
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
