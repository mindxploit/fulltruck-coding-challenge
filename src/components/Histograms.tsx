import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart'
import { format } from 'date-fns'
import { StatisticsResponse } from '../hook/useStatistics'
import { Box, Card, Stack, Typography } from '@mui/material'

type HistogramsProps = {
  histograms: StatisticsResponse['histograms']
}

const groupDataByMonth = (data: { date: string; value: number }[]) => {
  const result: { date: string; value: number; month: string }[] = []

  data.forEach((entry) => {
    const [day, month, year] = entry.date.split('-')
    const formattedDateString = `${year}-${month}-${day}`

    const groupMonth = format(new Date(formattedDateString), 'yyyy-MM')
    result.push({ date: entry.date, value: entry.value, month: groupMonth })
  })

  return result
}

const Histograms: React.FC<HistogramsProps> = ({ histograms }) => {
  const timeMarginPerc = groupDataByMonth(
    histograms.time_margin_perc.data.map(({ date, margin_perc }) => ({ date, value: margin_perc }))
  )
  const timeOrderCount = groupDataByMonth(
    histograms.time_order_count.data.map(({ date, order_count }) => ({ date, value: order_count }))
  )
  const timeRevenue = groupDataByMonth(
    histograms.time_revenue.data.map(({ date, revenue }) => ({ date, value: revenue }))
  )

  const renderBarChart = (
    data: { date: string; value: number; month: string }[],
    title: string,
    dataKey: string
  ) => (
    <Card key={title} style={{ margin: '1rem', marginLeft: 0, padding: '.2rem' }}>
      <BarChart
        width={600}
        height={300}
        dataset={data}
        series={[{ dataKey: 'value', label: title, color: '#f93f39' }]}
        xAxis={[{ scaleType: 'band', dataKey: 'date' }]}
      />
    </Card>
  )

  return (
    <Stack sx={{ maxWidth: '100%', flexDirection: { xs: 'column', lg: 'row' }, overflow: 'auto' }}>
      <Box>
        <Typography variant="h5" fontWeight={'bold'}>
          Margin %
        </Typography>
        {renderBarChart(timeMarginPerc, 'Margin %', 'margin_perc')}
      </Box>
      <Box>
        <Typography variant="h5" fontWeight={'bold'}>
          Total Orders
        </Typography>
        {renderBarChart(timeOrderCount, 'Total Orders', 'order_count')}
      </Box>
      <Box>
        <Typography variant="h5" fontWeight={'bold'}>
          Time Revenue
        </Typography>
        {renderBarChart(timeRevenue, 'Time Revenue', 'Revenue')}
      </Box>
    </Stack>
  )
}

export default Histograms
