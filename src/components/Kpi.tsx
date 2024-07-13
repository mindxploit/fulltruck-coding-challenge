import React, { useState } from 'react'
import { Card, Box, Stack, Typography, Select, MenuItem, Divider } from '@mui/material'

interface KPI {
  label: string
  margin_abs: number
  margin_abs_per_order: number
  margin_abs_perc_on_tot: number
  margin_perc: number
  order_count: number
  order_count_perc_on_tot: number
  revenue: number
  revenue_per_order: number
  revenue_perc_on_tot: number
}

interface KPIs {
  carrier: { [key: string]: KPI }
  client: { [key: string]: KPI }
}

interface KPIComponentProps {
  kpis: KPIs
}

const KPIComponent: React.FC<KPIComponentProps> = ({ kpis }) => {
  const carrierOptions = Object.values(kpis.carrier)
  const clientOptions = Object.values(kpis.client)

  const [selectedCarrier, setSelectedCarrier] = useState<string>(carrierOptions[0].label)
  const [selectedClient, setSelectedClient] = useState<string>(clientOptions[0].label)

  console.log('carrier options', carrierOptions)

  const handleCarrierChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCarrier(event.target.value as string)
  }

  const handleClientChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedClient(event.target.value as string)
  }

  const getSelectedCarrier = carrierOptions.filter((e) => e.label === selectedCarrier)[0]
  const getSelectedClient = clientOptions.filter((e) => e.label === selectedClient)[0]

  const renderKPIBox = (kpi: KPI) =>
    kpi ? (
      <Box>
        <Typography variant="overline" fontWeight={'bold'}>
          Orders
        </Typography>
        <Typography>Total: {kpi.order_count}</Typography>
        <Typography>% over total orders: {kpi.order_count_perc_on_tot.toFixed(2)}</Typography>
        <Typography variant="overline" fontWeight={'bold'}>
          Revenue
        </Typography>
        <Typography>Total: {kpi.revenue}</Typography>
        <Typography>Per order: {kpi.revenue_per_order.toFixed(2)}</Typography>
        <Typography>% over total orders: {kpi.revenue_perc_on_tot.toFixed(2)}</Typography>
        <Typography variant="overline" fontWeight={'bold'}>
          Margin
        </Typography>
        <Typography>Total: {kpi.margin_abs}</Typography>
        <Typography>Per order: {kpi.margin_abs_per_order.toFixed(2)}</Typography>
        <Typography>% over total: {kpi.margin_abs_perc_on_tot.toFixed(2)}</Typography>
      </Box>
    ) : (
      <></>
    )

  return (
    <Stack>
      <Typography variant="h4" fontWeight={'bold'}>
        Users KPI's
      </Typography>
      <Card>
        <Stack width={550} direction="row" divider={<Divider orientation="vertical" flexItem />}>
          <Box flex={1} p={2}>
            <label style={{ fontWeight: '500' }}>Carrier</label>
            <Select value={selectedCarrier} onChange={(e) => handleCarrierChange(e)} fullWidth>
              {carrierOptions.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {renderKPIBox(getSelectedCarrier)}
          </Box>
          <Box flex={1} p={2}>
            <label style={{ fontWeight: '500' }}>Client</label>
            <Select value={selectedClient} onChange={(e) => handleClientChange(e)} fullWidth>
              {clientOptions.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {renderKPIBox(getSelectedClient)}
          </Box>
        </Stack>
      </Card>
    </Stack>
  )
}

export default KPIComponent
