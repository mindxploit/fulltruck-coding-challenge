import { Box, Container, Divider, List, ListItem, Stack, Typography } from '@mui/material'

import { FC, useEffect, useState } from 'react'
import FullTruckLogo from './components/logo/FullTruckLogo'
import useStatistics, { StatisticsResponse } from './hook/useStatistics'
import CustomTable from './components/CustomTable'

const Dashboard: FC = () => {
  const { fetchStatistics } = useStatistics()
  const startDate = null
  const endDate = null
  const [data, setData] = useState<StatisticsResponse>()
  const [isLoading, setIsLoading] = useState(false)

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
    <Container maxWidth="lg">
      <Stack spacing={2}>
        <Box justifyContent={'center'} alignItems="center">
          <FullTruckLogo />
          {data && <CustomTable isLoading={isLoading} data={data?.data_table} />}
        </Box>
        <Divider />
      </Stack>
    </Container>
  )
}

export default Dashboard
