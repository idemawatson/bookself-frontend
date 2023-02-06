import { FC, Suspense } from 'react'
import ShelfPage from '@/components/organisms/shelf/ShelfPage'
import SkeletonShelfPage from '@/components/organisms/shelf/SkeletonShelfPage'
import ShelfFilterTabs from '@/components/organisms/shelf/ShelfFilterTabs'
import ShelfHeader from '@/components/organisms/shelf/ShelfHeader'
import { Container } from '@mui/material'

type Props = {}

const ShelfTemplate: FC<Props> = ({}) => {
  return (
    <Container sx={{ pb: 10 }}>
      <ShelfFilterTabs />
      <ShelfHeader />
      <Suspense fallback={<SkeletonShelfPage />}>
        <ShelfPage />
      </Suspense>
    </Container>
  )
}

export default ShelfTemplate
