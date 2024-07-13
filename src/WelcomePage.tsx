import { Box, Container, Divider, List, ListItem, Stack, Typography } from '@mui/material'

import { FC, useEffect, useState } from 'react'
import FullTruckLogo from './components/logo/FullTruckLogo'
import useStatistics, { StatisticsResponse } from './hook/useStatistics'
import CustomTable from './components/CustomTable'
import Histograms from './components/Histograms'
import Scalars from './components/Scalars'
import ScalarsPieChart from './components/Scalars'
import KPIComponent from './components/Kpi'

const Dashboard: FC = () => {
  const { fetchStatistics } = useStatistics()
  const startDate = null
  const endDate = null
  const [data, setData] = useState<StatisticsResponse>()
  const [isLoading, setIsLoading] = useState(false)
  const [aggregationPeriod, setAggregationPeriod] = useState<'day' | 'week' | 'month'>('day')

  const fetchData = async () => {
    setIsLoading(true)

    const result = (await fetchStatistics({
      aggregateBy: 'day',
      timeTarget: 'pickup_date',
      startDate,
      endDate,
    })) as StatisticsResponse

    result && setData(result)
    setIsLoading(false)
    console.log(result, 'fetched')
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Box p={5}>
      <Stack justifyContent={'center'} alignItems="center" spacing={2}>
        <FullTruckLogo />
        <Divider flexItem />
        {data && (
          <>
            <Stack direction={'row'} spacing={2}>
              <ScalarsPieChart data={data?.scalars} />
              <KPIComponent kpis={data?.kpis} />
            </Stack>
            <CustomTable
              isLoading={isLoading}
              data={data?.data_table}
              aggregationPeriod={aggregationPeriod}
              setAggregationPeriod={setAggregationPeriod}
            />
            <Histograms histograms={data?.histograms} />
          </>
        )}
      </Stack>
    </Box>
  )
}

export default Dashboard
