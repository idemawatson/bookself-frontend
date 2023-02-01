import { Box, CircularProgress, Container } from '@mui/material'
import { FC, useState } from 'react'

import { useSearchBook } from '@/hooks/useSearchBook'
import BookCard from '@/components/uiParts/BookCard'
import { ClientBook } from '@/types/BooksResponse'
import BookAddConfirmationDialog from '@/components/organisms/search/BookAddConfirmationDialog'
import SearchBookForm from '@/components/organisms/search/SearchBookForm'

const INDICATOR_SIZE = 40

const SearchPresenter: FC = () => {
  const [userInput, setUserInput] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const [selectedBook, setSelectedBook] = useState<ClientBook | undefined>(undefined)

  const { data } = useSearchBook(searchWord)

  const search = ($event: React.FormEvent<HTMLFormElement>) => {
    $event.preventDefault()
    setSearchWord(userInput)
  }

  const openConfirm = (book: ClientBook) => {
    setSelectedBook(book)
  }

  return (
    <>
      <Container sx={{ height: '100%' }}>
        <SearchBookForm search={search} setUserInput={setUserInput} />
        <Box sx={{ overflowY: 'auto', maxHeight: '80%', mt: 2 }}>
          {!data && (
            <CircularProgress
              size={INDICATOR_SIZE}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: `${-INDICATOR_SIZE / 2}px`,
                marginLeft: `${-INDICATOR_SIZE / 2}px`,
              }}
            />
          )}
          {data?.map((book) => (
            <Box sx={{ my: 1 }} key={book.id}>
              <BookCard book={book} handleOnClick={() => openConfirm(book)} />
            </Box>
          ))}
        </Box>
      </Container>
      <BookAddConfirmationDialog close={() => setSelectedBook(undefined)} book={selectedBook} />
    </>
  )
}

export default SearchPresenter
