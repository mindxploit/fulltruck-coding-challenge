import Box from '@mui/material/Box'
import { FC } from 'react'

type Props = {
  onClick?: () => void
}

const FullTruckLogo: FC<Props> = ({ onClick }) => {
  return (
    <Box
      component="img"
      sx={{
        height: 32,
        width: 260,
        '&:hover': {
          cursor: onClick ? 'pointer' : 'default',
        },
      }}
      alt="The FullTruck logo"
      src={'./logo.png'}
      onClick={onClick}
    />
  )
}

export default FullTruckLogo
