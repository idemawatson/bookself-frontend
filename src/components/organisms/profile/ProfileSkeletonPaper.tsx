import { Container, Paper, Skeleton, Typography } from '@mui/material'
import { FC } from 'react'

const SkeletonProfilePaper: FC = () => {
  const StatusPaper = () => {
    return (
      <Paper elevation={0} sx={{ py: 1, px: 2, my: 2 }}>
        <Typography sx={{ fontSize: 24, fontWeight: 500, color: 'gray' }}>
          <Skeleton></Skeleton>
        </Typography>
        <Typography
          sx={{
            textAlign: 'right',
            pr: 2,
            fontSize: 40,
            fontWeight: 'bold',
            color: 'primary.main',
          }}
        >
          <Skeleton></Skeleton>
        </Typography>
      </Paper>
    )
  }
  return (
    <Container>
      <StatusPaper />
      <StatusPaper />
      <StatusPaper />
    </Container>
  )
}

export default SkeletonProfilePaper
