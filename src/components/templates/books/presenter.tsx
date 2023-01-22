import { useBooks } from '@/hooks/useBooks'
import { Box, Typography } from '@mui/material'
import { FC } from 'react'

type Props = {}

const Presenter: FC<Props> = ({}) => {
  const { data } = useBooks()
  console.log(data)
  return (
    <>
      <Box
        sx={{
          margin: 2,
        }}
      >
        <Typography>{JSON.stringify(data)}</Typography>
      </Box>
    </>
  )
}

export default Presenter
