import { yupResolver } from '@hookform/resolvers/yup'
import BookCard from '@/components/uiParts/BookCard'
import { ClientBook } from '@/types/BooksResponse'
import { IBookUpdateForm, BOOK_STATUS, bookUpdateSchema } from '@/types/IBookForm'
import { Box, Button, Grid, SwipeableDrawer } from '@mui/material'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import BookUpdateForm from './BookUpdateForm'
import { BaseButton } from '@/components/uiParts/BaseButton'
import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import { useNotification } from '@/components/uiParts/TheNotificationToast/hooks'
import dayjs from '@/libs/importDayjs'
import getBackendAPIServiceClient from '@/libs/APIServiceClient/BackendAPIServiceClient'
import { useToken } from '@/hooks/staticSWR/useAccessToken'
import { BookUpdateRequest } from '@/types/request/BookUpdateRequest'
import { KeyedMutator } from 'swr'
import { useSelectedBook } from '@/hooks/staticSWR/useSelectedBook'
import axios from 'axios'

type Props = {
  open: boolean
  setOpen: (value: boolean) => void
  mutate: KeyedMutator<ClientBook[][]>
}

const BookUpdateDrawer: FC<Props> = ({ open, setOpen, mutate }) => {
  const { showLoading, hideLoading } = useLoading()
  const { showSuccess, showError } = useNotification()
  const { selectedBook: book } = useSelectedBook()
  const { token } = useToken()
  const formMethods = useForm<IBookUpdateForm>({
    mode: 'onChange',
    resolver: yupResolver(bookUpdateSchema),
  })
  useEffect(() => {
    if (book) {
      formMethods.setValue('comment', book.comment || '')
      formMethods.setValue('status', book.status)
      formMethods.setValue('completedAt', dayjs(book?.completedAt).toDate())
    }
  }, [book])

  const close = () => {
    setOpen(false)
  }

  const update = async (form: IBookUpdateForm) => {
    try {
      if (!book) return
      showLoading()
      const req = {
        ...form,
        completedAt:
          form.status === BOOK_STATUS[3] ? dayjs(form.completedAt).format('YYYY-MM-DD') : null,
      }
      await getBackendAPIServiceClient(token).put<BookUpdateRequest, any>(`/books/${book.id}`, req)
      showSuccess('更新しました')
      mutate()
      close()
    } catch (err) {
      console.error(err)
      if (axios.isAxiosError(err) && err.response?.data.status === 404) {
        showError('書籍が削除済です。')
      } else {
        showError('エラーが発生しました')
      }
    } finally {
      hideLoading()
    }
  }

  return (
    <>
      <SwipeableDrawer
        anchor='bottom'
        open={open}
        onOpen={() => setOpen(true)}
        onClose={close}
        sx={{ zIndex: 1000 }}
      >
        <Box sx={{ p: 1 }}>
          {book && (
            <>
              <BookCard book={book} />
              <form onSubmit={formMethods.handleSubmit(update)}>
                <Box sx={{ p: 1, mt: 2 }}>
                  <BookUpdateForm
                    control={formMethods.control}
                    watch={formMethods.watch}
                    setValue={formMethods.setValue}
                  />
                </Box>
                <Grid container>
                  <Grid item xs={6} sx={{ textAlign: 'left' }}>
                    <Button disableElevation onClick={close}>
                      閉じる
                    </Button>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    <BaseButton
                      submit={true}
                      color='secondary'
                      disabled={!formMethods.formState.isValid}
                    >
                      更新
                    </BaseButton>
                  </Grid>
                </Grid>
              </form>
            </>
          )}
        </Box>
      </SwipeableDrawer>
    </>
  )
}

export default BookUpdateDrawer
