import { useBooks } from '@/hooks/useBooks'
import { Container, ImageList, ImageListItem } from '@mui/material'
import { FC } from 'react'

type Props = {
  page: number
}
const BooksPage: FC<Props> = ({ page }) => {
  const { data } = useBooks(page)
  if (!data) return <></>
  return (
    <Container>
      <ImageList cols={3} rowHeight={164} gap={8}>
        {data.books.map((book) => (
          <ImageListItem key={book.book_id}>
            <img src={`${book.image_url}?fit=crop&auto=format`} loading='lazy' />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  )
}

export default BooksPage
