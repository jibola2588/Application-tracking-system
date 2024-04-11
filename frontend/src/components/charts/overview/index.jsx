
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import styled from 'styled-components'
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

const Container = styled.div``
const Top = styled.div``
const CustomDateRangePickerContainer = styled.div`
width:300px;
height:30px;
`
const Bottom = styled.div``

export default function OverviewChart() {
    const [value, setValue] = React.useState([
        dayjs('2022-04-17'),
        dayjs('2022-04-21'),
      ]);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = 'blue';
        const textColor = '#84B1FA'
        const textColorSecondary = '#999EA8';
        const surfaceBorder = '#999EA8';
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Successful Applications',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#18425D',
                    tension: 0.4
                },
                {
                    label: 'Rejected Appications',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: 'red',
                    tension: 0.4
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

  
    
    return (
        <Container className='max-w-7xl p-4 shadow-md rounded-md'>
            <Top className='flex justify-end'>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
     <CustomDateRangePickerContainer>
      <DemoContainer components={['DateRangePicker', 'DateRangePicker']}>
        <DemoItem  component="DateRangePicker">
          <DateRangePicker
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </DemoItem>
      </DemoContainer>
      </CustomDateRangePickerContainer>
    </LocalizationProvider>
            </Top>
            <Bottom className='mt-10'> 
            <Chart type="line" data={chartData} options={chartOptions} />
            </Bottom>
        </Container>
    )
}
        