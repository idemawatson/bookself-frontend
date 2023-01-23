import { Container, Grid, Skeleton } from '@mui/material'
import { FC } from 'react'

const SkeletonBooksPage: FC = () => {
  return (
    <Container>
      <Grid container>
        {[...Array(12)].map((i) => (
          <Grid item xs={4} key={i} sx={{ padding: '4px' }}>
            <Skeleton variant='rectangular' height={164} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default SkeletonBooksPage
