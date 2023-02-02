import { useBooks } from '@/hooks/useBooks'
import { ClientBook } from '@/types/BooksResponse'
import { Box, Container, ImageList, ImageListItem } from '@mui/material'
import { FC, useState } from 'react'
import BookEditDrawer from './BookEditDrawer'

type Props = {
  page: number
}
const ShelfPage: FC<Props> = ({ page }) => {
  const { data } = useBooks(page)
  const [selectedBook, setSelectedBook] = useState<ClientBook | undefined>(undefined)
  if (!data) return <></>
  return (
    <Container>
      <ImageList cols={3} rowHeight={164} gap={8}>
        {data.books.map((book) => (
          <div key={book.id} onClick={() => setSelectedBook(book)}>
            <ImageListItem>
              <img src={`${book.imageUrl}?fit=crop&auto=format`} loading='lazy' />
            </ImageListItem>
          </div>
        ))}
      </ImageList>
      <BookEditDrawer book={selectedBook} close={() => setSelectedBook(undefined)}></BookEditDrawer>
    </Container>
  )
}

export default ShelfPage
