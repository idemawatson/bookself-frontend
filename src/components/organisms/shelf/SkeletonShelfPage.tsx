import { Container, Grid, Skeleton } from '@mui/material'
import dayjs from 'dayjs'
import { FC } from 'react'

const SkeletonShelfPage: FC = () => {
  const timestamp = dayjs().toISOString()
  return (
    <Container>
      <Grid container>
        {[...Array(12)].map((_, i) => (
          <Grid item xs={4} key={`${timestamp}_${i}`} sx={{ padding: '4px' }}>
            <Skeleton variant='rectangular' height={164} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default SkeletonShelfPage
