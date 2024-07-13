import React, { useState, useEffect } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { StatisticsResponse } from '../hook/useStatistics'
import { format } from 'date-fns/format' // Import date-fns for date formatting

import { startOfDay } from 'date-fns/startOfDay'
import { startOfWeek } from 'date-fns/startOfWeek'
import { startOfMonth } from 'date-fns/startOfMonth'
import { Stack, Typography } from '@mui/material'

type DataTableProps = {
  data: StatisticsResponse['data_table']
  isLoading: boolean
  aggregationPeriod: 'day' | 'week' | 'month'
  setAggregationPeriod: React.Dispatch<React.SetStateAction<'day' | 'week' | 'month'>>
}

const CustomTable: React.FC<DataTableProps> = ({
  data,
  isLoading,
  aggregationPeriod,
  setAggregationPeriod,
}) => {
  const [filteredData, setFilteredData] = useState(data)

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const aggregateData = (data: DataTableProps['data'], period: 'day' | 'week' | 'month') => {
    const aggregatedData: { [key: string]: any & { count: number } } = {}

    data.forEach((item) => {
      let groupKey: string

      const date = new Date(item.aggregate_date)
      if (period === 'day') {
        groupKey = format(startOfDay(date), 'yyyy-MM-dd')
      } else if (period === 'week') {
        groupKey = format(startOfWeek(date, { weekStartsOn: 1 }), 'yyyy-MM-dd')
      } else {
        groupKey = format(startOfMonth(date), 'yyyy-MM-dd')
      }

      // aggregate by groupKey and sum the values
      if (!aggregatedData[groupKey]) {
        aggregatedData[groupKey] = {
          ...item,
          aggregate_date: groupKey,
          order_count: item.order_count,
          count: 1,
        }
      } else {
        aggregatedData[groupKey].active_carrier += item.active_carrier
        aggregatedData[groupKey].active_client += item.active_client
        aggregatedData[groupKey].order_count += item.order_count
        aggregatedData[groupKey].assigned_count += item.assigned_count
        aggregatedData[groupKey].margin_abs += item.margin_abs
        aggregatedData[groupKey].margin_abs_per_order += item.margin_abs_per_order
        aggregatedData[groupKey].margin_perc += item.margin_perc
        aggregatedData[groupKey].revenue += item.revenue
        aggregatedData[groupKey].revenue_assigned += item.revenue_assigned
        aggregatedData[groupKey].revenue_per_order += item.revenue_per_order
        aggregatedData[groupKey].count += 1
      }
    })

    // return with average for relative properties
    return Object.values(aggregatedData).map((item) => {
      return {
        ...item,
        margin_abs_per_order: item.margin_abs_per_order / item.count,
        margin_perc: item.margin_perc / item.count,
        revenue_per_order: item.revenue_per_order / item.count,
      }
    })
  }

  useEffect(() => {
    // Filter and aggregate the data based on the selected time range and period
    const filtered = data.filter((item) => {
      const date = new Date(item.aggregate_date)
      return (!startDate || date >= startDate) && (!endDate || date <= endDate)
    })

    // You would also implement aggregation logic here based on the aggregationPeriod
    const aggregated = aggregateData(filtered, aggregationPeriod)

    setFilteredData(aggregated)
  }, [data, startDate, endDate, aggregationPeriod])

  const columns: GridColDef[] = [
    {
      field: 'aggregate_date',
      headerName: 'Date',
      width: 150,
      valueFormatter: (value: string) => {
        return format(new Date(value), 'yyyy-MM-dd')
      },
    },
    { field: 'active_carrier', headerName: 'Active carriers', width: 150 },
    { field: 'active_client', headerName: 'Active clients', width: 150 },
    { field: 'order_count', headerName: 'Total orders', width: 150 },
    { field: 'assigned_count', headerName: 'Assigned orders', width: 150 },
    {
      field: 'margin_abs',
      headerName: 'Absolute margin',
      width: 150,
      valueFormatter: (value: number) => {
        return value + ' €'
      },
    },
    {
      field: 'margin_abs_per_order',
      headerName: 'Absolute margin per order',
      width: 200,
      valueFormatter: (value: number) => {
        return value.toFixed(4) + ' €'
      },
    },
    {
      field: 'margin_perc',
      headerName: 'Margin %',
      width: 150,
      valueFormatter: (value: number) => {
        return value.toFixed(4)
      },
    },
    {
      field: 'revenue',
      headerName: 'Total revenue',
      width: 150,
      valueFormatter: (value: number) => {
        return value + ' €'
      },
    },
    {
      field: 'revenue_assigned',
      headerName: 'Revenue from assigned orders',
      width: 200,
      valueFormatter: (value: number) => {
        return value + ' €'
      },
    },
    {
      field: 'revenue_per_order',
      headerName: 'Revenue per order',
      width: 150,
      valueFormatter: (value: number) => {
        return value.toFixed(4) + ' €'
      },
    },
  ]

  return (
    <div>
      <Typography variant="h4" fontWeight={'bold'}>
        Table data
      </Typography>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Aggregation Period:
          <select
            value={aggregationPeriod}
            onChange={(e) => setAggregationPeriod(e.target.value as 'day' | 'week' | 'month')}
            style={{ marginBottom: '.3rem', marginLeft: '.2rem' }}
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </label>
        <Stack direction={'row'} spacing={1}>
          <label style={{ marginBottom: '.3rem', marginRight: '.2rem' }}>
            Start Date:
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
            />
          </label>
          <label>
            End Date:
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
            />
          </label>
        </Stack>
      </div>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          loading={isLoading}
          rows={filteredData}
          columns={columns}
          getRowId={(row) => row.aggregate_date}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  )
}

export default CustomTable
