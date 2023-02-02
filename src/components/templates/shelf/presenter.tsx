import { useBooks } from '@/hooks/useBooks'
import Carousel from 'react-material-ui-carousel'
import { FC, Suspense, useState } from 'react'
import ShelfPage from '@/components/organisms/shelf/ShelfPage'
import SkeletonShelfPage from '@/components/organisms/shelf/SkeletonShelfPage'
import dayjs from '@/libs/importDayjs'

type Props = {}

const Presenter: FC<Props> = ({}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data } = useBooks(currentPage)
  const timestamp = dayjs().toISOString()

  if (!data) return <></>

  const onChangeCarousel = (page?: number) => {
    setCurrentPage(page ? page + 1 : 1)
  }

  const ShelfPageWithSuspense = () => {
    return (
      <Suspense fallback={<SkeletonShelfPage />}>
        <ShelfPage page={currentPage} />
      </Suspense>
    )
  }

  return (
    <>
      <Carousel onChange={onChangeCarousel} autoPlay={false}>
        {[...Array(data.meta.totalPages)].map((_, i) => (
          <ShelfPageWithSuspense key={`${timestamp}_${i}`} />
        ))}
      </Carousel>
    </>
  )
}

export default Presenter
