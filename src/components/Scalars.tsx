import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart'
import { Box, Typography } from '@mui/material'

interface Scalars {
  active_carriers: number
  active_clients: number
  average_margin_perc: number
  avg_order_margin_abs: number
  avg_order_revenue: number
  new_carriers: number
  new_clients: number
  total_assigned_count: number
  total_margin_abs: number
  total_order_count: number
  total_revenue: number
}

interface ScalarsPieChartProps {
  data: Scalars
}

const ScalarsPieChart: React.FC<ScalarsPieChartProps> = ({ data }) => {
  const revenueMarginData = [
    { name: 'Total Revenue', value: data.total_revenue, color: 'gray', label: 'Revenue' },
    { name: 'Total Margin', value: data.total_margin_abs, color: 'red', label: 'Margin' },
  ]

  const orderData = [
    { name: 'Assigned Orders', value: data.total_assigned_count, color: 'red', label: 'Assigned Orders' },
    {
      name: 'Unassigned Orders',
      value: data.total_order_count - data.total_assigned_count,
      color: 'gray',
      label: 'Unassigned Orders',
    },
  ]

  return (
  <>
      <Typography variant='h3'>Overview</Typography>
    <Box display="flex">
      <Box>
        <PieChart
          height={300}
          width={400}
          colors={revenueMarginData.map((d) => d.color)}
          series={[
            {
              data: revenueMarginData.map((d) => ({ ...d, color: d.color })),
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: 0,
              endAngle: 360,
              cx: 150,
              cy: 150,
            },
          ]}
        />
      </Box>

      <Box>
        <PieChart
          height={300}
          width={470}
          colors={orderData.map((d) => d.color)}
          series={[
            {
              data: orderData.map((d) => ({ ...d, color: d.color })),
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: 0,
              endAngle: 360,
              cx: 150,
              cy: 150,
            },
          ]}
        />
      </Box>
    </Box>
  </>
  )
}

export default ScalarsPieChart
