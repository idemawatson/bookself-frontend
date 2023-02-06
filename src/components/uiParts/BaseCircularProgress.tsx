import { CircularProgress } from '@mui/material'
import { FC } from 'react'

type Props = {
  indicator_size: number
  sx?: any
}

const BaseCircularProgress: FC<Props> = ({ indicator_size, sx }) => {
  return (
    <CircularProgress
      size={indicator_size}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: `${-indicator_size / 2}px`,
        marginLeft: `${-indicator_size / 2}px`,
        ...sx,
      }}
    />
  )
}
export default BaseCircularProgress
