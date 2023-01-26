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

type Props = {}

const SearchPresenter: FC<Props> = ({}) => {
  const [userInput, setUserInput] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const { data } = useSearchBook(searchWord)
  const indicatorSize = 40
  const search = ($event: React.FormEvent<HTMLFormElement>) => {
    $event.preventDefault()
    setSearchWord(userInput)
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
          {data?.map((book, index) => (
            <Card elevation={0} key={index} sx={{ my: '8px' }}>
              <CardContent>
                <Typography>{JSON.stringify(book)}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </>
  )
}

export default SearchPresenter
