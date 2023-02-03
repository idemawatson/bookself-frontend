import { useSelectedBook } from '@/hooks/staticSWR/useSelectedBook'
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
  const { setSelectedBook } = useSelectedBook()
  const [drawer, setDrawer] = useState(false)
  const open = (book: ClientBook) => {
    setSelectedBook({ ...book })
    setDrawer(true)
  }
  if (!data) return <></>
  return (
    <Container>
      <ImageList cols={3} rowHeight={164} gap={8}>
        {data.books.map((book) => (
          <div key={book.id} onClick={() => open(book)}>
            <ImageListItem>
              <img src={`${book.imageUrl}?fit=crop&auto=format`} loading='lazy' />
            </ImageListItem>
          </div>
        ))}
      </ImageList>
      <BookUpdateDrawer open={drawer} setOpen={setDrawer} mutate={mutate}></BookUpdateDrawer>
    </Container>
  )
}

export default ShelfPage
