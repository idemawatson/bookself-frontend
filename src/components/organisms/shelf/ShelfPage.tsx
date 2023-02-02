import { useBooks } from '@/hooks/useBooks'
import { ClientBook } from '@/types/BooksResponse'
import { Box, Container, ImageList, ImageListItem } from '@mui/material'
import { FC, useState } from 'react'
import BookUpdateDrawer from './BookUpdateDrawer'

type Props = {
  page: number
}
const ShelfPage: FC<Props> = ({ page }) => {
  const { data, mutate } = useBooks(page)
  const [selectedBook, setSelectedBook] = useState<ClientBook | undefined>(undefined)
  const [drawer, setDrawer] = useState(false)
  if (!data) return <></>
  return (
    <Container>
      <ImageList cols={3} rowHeight={164} gap={8}>
        {data.books.map((book) => (
          <div
            key={book.id}
            onClick={() => {
              setSelectedBook(book)
              setDrawer(true)
            }}
          >
            <ImageListItem>
              <img src={`${book.imageUrl}?fit=crop&auto=format`} loading='lazy' />
            </ImageListItem>
          </div>
        ))}
      </ImageList>
      {selectedBook && (
        <BookUpdateDrawer
          open={drawer}
          setOpen={setDrawer}
          book={selectedBook}
          mutate={mutate}
        ></BookUpdateDrawer>
      )}
    </Container>
  )
}

export default ShelfPage
