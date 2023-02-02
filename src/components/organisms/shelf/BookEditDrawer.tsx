import BookCard from '@/components/uiParts/BookCard'
import { ClientBook } from '@/types/BooksResponse'
import { Box, SwipeableDrawer } from '@mui/material'
import { FC } from 'react'

type Props = {
  close: () => void
  book?: ClientBook
}

const BookEditDrawer: FC<Props> = ({ close, book }) => {
  if (!book) return <></>
  return (
    <>
      <SwipeableDrawer anchor='bottom' open={!!book} onOpen={() => {}} onClose={close}>
        <Box sx={{ p: 1 }}>
          <BookCard book={book} />
        </Box>
      </SwipeableDrawer>
    </>
  )
}

export default BookEditDrawer
