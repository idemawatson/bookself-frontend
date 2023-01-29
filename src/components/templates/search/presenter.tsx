import { TextField } from '@/components/uiParts/TextField/presenter'
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from '@mui/material'
import { FC, useState } from 'react'

import { Search } from '@mui/icons-material'
import { useSearchBook } from '@/hooks/useSearchBook'
import BookCard from '@/components/uiParts/BookCard'
import { ClientBook } from '@/types/BooksResponse'
import getBackendAPIServiceClient from '@/libs/APIServiceClient/BackendAPIServiceClient'
import { useToken } from '@/hooks/useAccessToken'
import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import { useNotification } from '@/components/uiParts/TheNotificationToast/hooks'
import axios from 'axios'

type Props = {}

const SearchPresenter: FC<Props> = ({}) => {
  const { token } = useToken()
  const { showLoading, hideLoading } = useLoading()
  const { showSuccess, showError } = useNotification()
  const [userInput, setUserInput] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const { data } = useSearchBook(searchWord)
  const indicatorSize = 40
  const search = ($event: React.FormEvent<HTMLFormElement>) => {
    $event.preventDefault()
    setSearchWord(userInput)
  }
  const openConfirm = async (book: ClientBook) => {
    try {
      showLoading()
      const client = getBackendAPIServiceClient(token)
      await client.post('/books', book)
      showSuccess('本棚に追加しました')
    } catch (err) {
      console.error(err)
      if (axios.isAxiosError(err) && err.response?.data.title) {
        showError(err.response?.data.title)
      }
    } finally {
      hideLoading()
    }
  }
  return (
    <>
      <Container sx={{ height: '100%' }}>
        <Paper
          component='form'
          onSubmit={($event) => search($event)}
          elevation={5}
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder='タイトルで検索'
            onChange={($event) => setUserInput($event.target.value)}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical'></Divider>
          <IconButton type='submit' sx={{ p: '10px', color: 'primary.main' }}>
            <Search />
          </IconButton>
        </Paper>
        <Box sx={{ overflowY: 'auto', maxHeight: '80%', mt: 2 }}>
          {!data && (
            <CircularProgress
              size={indicatorSize}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: `${-indicatorSize / 2}px`,
                marginLeft: `${-indicatorSize / 2}px`,
              }}
            />
          )}
          {data?.map((book) => (
            <Box sx={{ my: 1 }} key={book.id}>
              <BookCard {...book} handleOnClick={() => openConfirm(book)}></BookCard>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  )
}

export default SearchPresenter
