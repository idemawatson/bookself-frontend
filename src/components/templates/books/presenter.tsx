import { useBooks } from '@/hooks/useBooks'
import Carousel from 'react-material-ui-carousel'
import { FC, useState } from 'react'
import BooksPage from '@/components/organisms/books/BooksPage'

type Props = {}

const Presenter: FC<Props> = ({}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data } = useBooks(currentPage)

  if (!data) return <></>

  const onChangeCarousel = (page?: number) => {
    setCurrentPage(page ? page + 1 : 1)
  }

  return (
    <>
      <Carousel onChange={onChangeCarousel} autoPlay={false}>
        {[...Array(data.total_pages)].map((i) => (
          <BooksPage key={i} page={currentPage} />
        ))}
      </Carousel>
    </>
  )
}

export default Presenter
