import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { format } from 'date-fns';
import { StatisticsResponse } from '../hook/useStatistics';
import { Box, Stack } from '@mui/material';

type HistogramsProps = {
  histograms: StatisticsResponse['histograms'];
};

const groupDataByMonth = (data: { date: string; value: number }[]) => {
  const result: { date: string; value: number; month: string }[] = [];

  data.forEach((entry) => {
    const [day, month, year] = entry.date.split('-');
    const formattedDateString = `${year}-${month}-${day}`;

    const groupMonth = format(new Date(formattedDateString), 'yyyy-MM');
    result.push({ date: entry.date, value: entry.value, month: groupMonth });
  });

  return result;
};

const Histograms: React.FC<HistogramsProps> = ({ histograms }) => {
  const timeMarginPerc = groupDataByMonth(histograms.time_margin_perc.data.map(({ date, margin_perc }) => ({ date, value: margin_perc })));
  const timeOrderCount = groupDataByMonth(histograms.time_order_count.data.map(({ date, order_count }) => ({ date, value: order_count })));
  const timeRevenue = groupDataByMonth(histograms.time_revenue.data.map(({ date, revenue }) => ({ date, value: revenue })));

  const renderBarChart = (data: { date: string; value: number, month: string }[], title: string, dataKey: string) => (
      <div key={title} style={{ marginBottom: '2rem' }}>
        <BarChart
          width={600}
          height={300}
          dataset={data}
          // series={[{ dataKey: 'value', label: title, color: '#8884d8' }]}
          series={[{ dataKey: 'value', label: title, color: '#f93f39' }]}
          xAxis={[{ scaleType: "band", dataKey: "date"}  ]}
          // tooltip={{ content: (tooltip) => <div>{tooltip?.name}: {tooltip?.value}</div> }}
          // xAxis={{ label: { value: 'Day', position: 'insideBottomRight', offset: 0 }, tickFormatter: (date) => format(date, 'dd') }}
        // yAxis={[{ scaleType: "band", dataKey:  "value"}  ]}
          // yAxis={{ label: { value: 'Value', position: 'insideLeftBottom', offset: 0 } }}
          // cartesianGrid={{ strokeDasharray: '3 3' }}
          // legend={{ layout: 'horizontal', align: 'center', verticalAlign: 'top' }}
        />
      </div>
    )

  return (
    <Stack direction={"row"}>
    <Box>
      <h2>Margin %</h2>
      {renderBarChart(timeMarginPerc, 'Margin %', 'margin_perc')}
    </Box>
      <Box>
      <h2>Total Orders</h2>
      {renderBarChart(timeOrderCount, 'Total Orders', 'order_count')}
    </Box>
      <Box>
      <h2>Time Revenue</h2>
      {renderBarChart(timeRevenue, 'Time Revenue', 'Revenue')}
    </Box>
    </Stack>
  );
};

export default Histograms;
