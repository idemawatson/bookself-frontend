import SkeletonShelfPage from '@/components/organisms/shelf/SkeletonShelfPage'
import { FC, Suspense } from 'react'
import Presenter from './presenter'

const Page: FC = () => {
  return (
    <>
      <Suspense fallback={<SkeletonShelfPage></SkeletonShelfPage>}>
        <Presenter />
      </Suspense>
    </>
  )
}

export default Page
