import { Typography } from '@mui/material'
import { FC } from 'react'
import BaseConfirmationDialog from '@/components/uiParts/BaseConfirmationDialog'
import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import getBackendAPIServiceClient from '@/libs/APIServiceClient/BackendAPIServiceClient'
import { useToken } from '@/hooks/useAccessToken'
import { ClientBook } from '@/types/BooksResponse'
import { useNotification } from '@/components/uiParts/TheNotificationToast/hooks'
import axios from 'axios'

type Props = {
  close: () => void
  book?: ClientBook
}

const BookAddConfirmationDialog: FC<Props> = ({ close, book }) => {
  const { token } = useToken()
  const { showLoading, hideLoading } = useLoading()
  const { showSuccess, showError } = useNotification()

  const addBookToShelf = async () => {
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
          を本棚に追加します。よろしいですか？
        </Typography>
      </BaseConfirmationDialog>
    </>
  )
}

export default BookAddConfirmationDialog
