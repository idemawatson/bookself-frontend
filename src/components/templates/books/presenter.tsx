import { useBooks } from '@/hooks/useBooks'
import Carousel from 'react-material-ui-carousel'
import { FC, Suspense, useState } from 'react'
import BooksPage from '@/components/organisms/books/BooksPage'
import SkeletonBooksPage from '@/components/organisms/books/SkeletonBooksPage'

type Props = {}

const Presenter: FC<Props> = ({}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data } = useBooks(currentPage)

  if (!data) return <></>

  const onChangeCarousel = (page?: number) => {
    setCurrentPage(page ? page + 1 : 1)
  }

  const BooksPageWithSuspense = () => {
    return (
      <Suspense fallback={<SkeletonBooksPage />}>
        <BooksPage page={currentPage} />
      </Suspense>
    )
  }

  return (
    <>
      <Carousel onChange={onChangeCarousel} autoPlay={false}>
        {[...Array(data.total_pages)].map((_, i) => (
          <BooksPageWithSuspense key={i} />
        ))}
      </Carousel>
    </>
  )
}

export default Presenter
