import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart'
import { Badge, Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'

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
      <Typography variant="h3">Overview</Typography>
      <Card sx={{ width: 'fit-content' }}>
        <CardContent>
          <Stack direction={'row'} spacing={3} divider={<Divider orientation="vertical" flexItem />}>
            <Box>
              <Stack
                direction={'row'}
                justifyContent={'space-around'}
                spacing={3}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Box>
                  <Typography variant="overline">Total revenue</Typography>
                  <Typography variant="h4">{'€' + data.total_revenue}</Typography>
                </Box>

                <Box>
                  <Typography variant="overline">Average order</Typography>
                  <Typography variant="h4">{'€' + data.avg_order_revenue.toFixed(2)}</Typography>
                  <Typography variant="caption">{`Margin of € ${data.avg_order_margin_abs.toFixed(
                    2
                  )} (${data.average_margin_perc.toFixed(2)} %)`}</Typography>
                </Box>
              </Stack>

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

            <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
              <Stack
                direction={'row'}
                justifyContent={'space-around'}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Box>
                  <Typography variant="overline">Total orders</Typography>
                  <Typography variant="h4">{data.total_order_count}</Typography>
                </Box>
                <Stack direction={'row'} spacing={3}>
                  <Box>
                    <Typography variant="overline">Active clients</Typography>
                    <Stack direction={'row'} alignItems={'center'} spacing={1} mt={1}>
                      <PersonIcon />
                      <Badge badgeContent={'↑' + data.new_clients} color="error">
                        <Typography variant="h6">{data.active_clients}</Typography>
                      </Badge>
                    </Stack>
                  </Box>

                  <Box>
                    <Typography variant="overline">Active carriers</Typography>
                    <Stack direction={'row'} alignItems={'center'} spacing={1} mt={1}>
                      <LocalShippingIcon />
                      <Badge badgeContent={'↑' + data.new_carriers} color="error">
                        <Typography variant="h6">{data.active_carriers}</Typography>
                      </Badge>
                    </Stack>
                  </Box>
                </Stack>
              </Stack>

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
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}

export default ScalarsPieChart
