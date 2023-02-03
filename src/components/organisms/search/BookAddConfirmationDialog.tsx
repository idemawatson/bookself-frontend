import { Box, Typography } from '@mui/material'
import { FC, useState } from 'react'
import BaseConfirmationDialog from '@/components/uiParts/BaseConfirmationDialog'
import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import getBackendAPIServiceClient from '@/libs/APIServiceClient/BackendAPIServiceClient'
import { useToken } from '@/hooks/staticSWR/useAccessToken'
import { SearchBook } from '@/types/BooksResponse'
import { useNotification } from '@/components/uiParts/TheNotificationToast/hooks'
import axios from 'axios'
import { BOOK_STATUS } from '@/types/IBookForm'
import { BookCreateRequest } from '@/types/request/BookCreateRequest'
import { SelectField } from '@/components/uiParts/SelectField/presenter'

export const STATUS_SELECTIONS = [
  { text: '読みたい', value: 0 },
  { text: '積読', value: 1 },
  { text: '読んでる', value: 2 },
  { text: '読んだ！', value: 3 },
]

type Props = {
  close: () => void
  book?: SearchBook
}

const BookAddConfirmationDialog: FC<Props> = ({ close, book }) => {
  const { token } = useToken()
  const { showLoading, hideLoading } = useLoading()
  const { showSuccess, showError } = useNotification()
  const [status, setStatus] = useState<typeof BOOK_STATUS[number]>(BOOK_STATUS[0])

  const addBookToShelf = async () => {
    try {
      if (!book) return
      showLoading()
      const client = getBackendAPIServiceClient(token)
      await client.post<BookCreateRequest, any>('/books', {
        ...book,
        book_id: book.id,
        status,
      })
      showSuccess('本棚に追加しました')
    } catch (err) {
      console.error(err)
      if (axios.isAxiosError(err) && err.response?.data.title) {
        showError(err.response?.data.title)
      } else {
        showError('エラーが発生しました')
      }
    } finally {
      hideLoading()
    }
  }
  const handleAgree = () => {
    addBookToShelf()
    close()
  }
  return (
    <>
      <BaseConfirmationDialog
        open={!!book}
        title='本棚に追加'
        handleClose={close}
        handleAgree={handleAgree}
      >
        <Typography variant='body1'>
          <span style={{ fontWeight: 'bold' }}>{book?.title}</span>
        </Typography>
        <Box sx={{ py: 2 }}>
          <SelectField
            name='status'
            label='今どんな感じ？'
            selectedValue={status}
            selectPropsList={STATUS_SELECTIONS}
            onChange={(event) => {
              setStatus(event.target.value as typeof BOOK_STATUS[number])
            }}
          />
        </Box>
      </BaseConfirmationDialog>
    </>
  )
}

export default BookAddConfirmationDialog
