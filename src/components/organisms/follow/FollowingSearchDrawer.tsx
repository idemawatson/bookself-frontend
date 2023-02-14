import { BaseButton } from '@/components/uiParts/BaseButton'
import BaseCircularProgress from '@/components/uiParts/BaseCircularProgress'
import { TextField } from '@/components/uiParts/TextField/presenter'
import { Search } from '@mui/icons-material'
import {
  Alert,
  AlertTitle,
  Box,
  InputAdornment,
  Paper,
  SwipeableDrawer,
  Typography,
} from '@mui/material'
import React, { FC, useState } from 'react'
import FollowingSearchResultList from './FollowingSearchResultList'
import { useSearchUser } from './hook/useSearchUser'

type Props = {}

const FollowingSearchDrawer: FC<Props> = () => {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const { data, mutate } = useSearchUser(searchWord)
  const search = ($event: React.FormEvent<HTMLFormElement>) => {
    $event.preventDefault()
    setSearchWord(input)
  }
  const renderSearchResult = () => {
    if (!searchWord) return <></>
    if (!data) return <BaseCircularProgress indicator_size={40} />
    return data.length == 0 ? (
      <Alert severity='info' sx={{ mt: 2 }}>
        <AlertTitle>Info</AlertTitle>
        <div>ユーザーが存在しません</div>
      </Alert>
    ) : (
      <FollowingSearchResultList users={data} mutate={mutate} />
    )
  }
  return (
    <>
      <Box sx={{ textAlign: 'right' }}>
        <BaseButton color='secondary' onClick={() => setOpen(true)}>
          <Search />
          <Typography>ユーザーを探す</Typography>
        </BaseButton>
      </Box>
      <SwipeableDrawer
        anchor='bottom'
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        sx={{ zIndex: 1000 }}
      >
        <Paper component='form' onSubmit={search} sx={{ height: '80vh', p: 2 }}>
          <TextField
            label='ユーザー検索'
            value={input}
            placeholder='ユーザー名を入力'
            onChange={($event) => setInput($event.target.value)}
            startAdornment={
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            }
          />
          {renderSearchResult()}
        </Paper>
      </SwipeableDrawer>
    </>
  )
}

export default FollowingSearchDrawer
