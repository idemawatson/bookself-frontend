import { Box, CircularProgress, Container } from '@mui/material'
import { FC, useState } from 'react'

import { useSearchBook } from '@/hooks/useSearchBook'
import BookCard from '@/components/uiParts/BookCard'
import { SearchBook } from '@/types/BooksResponse'
import BookAddConfirmationDialog from '@/components/organisms/search/BookAddConfirmationDialog'
import SearchBookForm from '@/components/organisms/search/SearchBookForm'
import BaseCircularProgress from '@/components/uiParts/BaseCircularProgress'

const INDICATOR_SIZE = 40

const SearchTemplate: FC = () => {
  const [userInput, setUserInput] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const [selectedBook, setSelectedBook] = useState<SearchBook | undefined>(undefined)

  const { data } = useSearchBook(searchWord)

  const search = ($event: React.FormEvent<HTMLFormElement>) => {
    $event.preventDefault()
    setSearchWord(userInput)
  }

  const openConfirm = (book: SearchBook) => {
    setSelectedBook(book)
  }

  return (
    <>
      <Container sx={{ height: '100%' }}>
        <SearchBookForm search={search} setUserInput={setUserInput} />
        <Box sx={{ overflowY: 'auto', maxHeight: '80%', mt: 2 }}>
          {!data && <BaseCircularProgress indicator_size={INDICATOR_SIZE} />}
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

export default SearchTemplate
