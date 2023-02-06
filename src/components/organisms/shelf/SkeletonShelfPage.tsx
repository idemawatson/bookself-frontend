import { Container, Grid, Skeleton, styled } from '@mui/material'
import dayjs from '@/libs/importDayjs'
import { FC } from 'react'

const SkeletonShelfPage: FC = () => {
  const timestamp = dayjs().toISOString()
  const StyledGrid = styled(Grid)({
    backgroundColor: '#996840',
    borderBottom: '20px solid #b37a4b',
    padding: 8,
    paddingBottom: 0,
  })
  return (
    <Grid container>
      {[...Array(12)].map((_, i) => (
        <StyledGrid item xs={4} key={`${timestamp}_${i}`}>
          <Skeleton variant='rectangular' height={164} />
        </StyledGrid>
      ))}
    </Grid>
  )
}

export default SkeletonShelfPage
