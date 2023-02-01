import { Search } from '@mui/icons-material'
import { Divider, IconButton, InputBase, Paper } from '@mui/material'
import { FC } from 'react'

type Props = {
  search: ($event: React.FormEvent<HTMLFormElement>) => void
  setUserInput: (input: string) => void
}

const SearchBookForm: FC<Props> = ({ search, setUserInput }) => {
  return (
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
  )
}

export default SearchBookForm
