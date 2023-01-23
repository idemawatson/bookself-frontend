import SkeletonBooksPage from '@/components/organisms/books/SkeletonBooksPage'
import { FC, Suspense } from 'react'
import Presenter from './presenter'

const Page: FC = () => {
  return (
    <>
      <Suspense fallback={<SkeletonBooksPage></SkeletonBooksPage>}>
        <Presenter />
      </Suspense>
    </>
  )
}

export default Page
