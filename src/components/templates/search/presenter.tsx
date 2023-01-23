import { TextField } from '@/components/uiParts/TextField/presenter'
import { ChangeEvent, FC, Suspense, useEffect, useState } from 'react'

type Props = {}

const SearchPresenter: FC<Props> = ({}) => {
  const [searchWord, setSearchWord] = useState('')

  useEffect(() => {
    console.log(searchWord)
  }, [searchWord])

  return (
    <>
      <TextField
        label='検索'
        value={searchWord}
        onChange={(event) => setSearchWord(event.target.value)}
      ></TextField>
    </>
  )
}

export default SearchPresenter
