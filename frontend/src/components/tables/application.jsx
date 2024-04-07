import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components'
import moment from 'moment'


const Container = styled.div``

const currentDate = moment().format('YYYY-MM-DD');

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'date', headerName: 'Applied Date', width: 130 },
  { field: 'name', headerName: 'Company Name', width: 150 },
  {
    field: 'type',
    headerName: 'Type',
    width: 200,
  },
  {
    field: 'post',
    headerName: 'Position',
    sortable: false,
    width: 100
  },
  {
    field: 'status',
    headerName: 'Status',
    sortable: false,
    width: 200,
  },
];

const rows = [
    {
        id:1,
        name:'Interswitch',
        date:currentDate,
        type:'Frontend developer',
        post:'James west',
        status:'pending'
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
