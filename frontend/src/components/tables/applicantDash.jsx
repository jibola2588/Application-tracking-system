import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components'

const Container = styled.div``

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'cName', headerName: 'Company Name', width: 130 },
  { field: 'cType', headerName: 'Company Type', width: 130 },
  {
    field: 'desg',
    headerName: 'Designation',
    width: 200,
  },
  {
    field: 'intName',
    headerName: 'Interviewer',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 130
  },
  {
    field: 'meetLnk',
    headerName: 'Meeting Link',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 300,
  },
];

const rows = [
    {
        cName:'Interswitch',
        id:1,
        cType:'Fintech',
        desg:'Frontend developer',
        intName:'James west',
        meetLnk:'https://meet.google.com/wnk-udmt-gmk'
    },
    {
        cName:'Google',
        id:2,
        cType:'Logistics',
        desg:'Backend developer',
        intName:'John doe',
        meetLnk:'https://meet.google.com/wnk-udmt-gmk'
    },
    {
        cName:'Futterwave',
        cType:'Fintech',
        id:3,
        desg:'UI/UX designer',
        intName:'Mary soft',
        meetLnk:'https://meet.google.com/wnk-udmt-gmk'
    },
    {
        cName:'Goldmansach',
        id:4,
        cType:'Fintech',
        desg:'Project manager',
        intName:'Vindi smart',
        meetLnk:'https://meet.google.com/wnk-udmt-gmk'
    },
    {
        cName:'Jumia',
        id:5,
        cType:'Ecommerce',
        desg:'Product manager',
        intName:'Bolaji lateef',
        meetLnk:'https://meet.google.com/wnk-udmt-gmk'
    },
    {
        cName:'Amazon',
        id:6,
        cType:'Fintech',
        desg:'Cloud engineer',
        intName:'Loe brown',
        meetLnk:'https://meet.google.com/wnk-udmt-gmk'
    },
];

export default function DataTable() {
  return (
    <Container className='w-full'>
    <div style={{ height: 400, width: '100%',textAlign:'left' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
    </Container>
  );
}
