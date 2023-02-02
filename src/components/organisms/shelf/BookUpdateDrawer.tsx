import { yupResolver } from '@hookform/resolvers/yup'
import BookCard from '@/components/uiParts/BookCard'
import { BooksResponse, ClientBook } from '@/types/BooksResponse'
import { IBookUpdateForm, BOOK_STATUS, schema } from '@/types/IBookUpdateForm'
import { Box, Button, Grid, SwipeableDrawer } from '@mui/material'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import BookUpdateForm from './BookUpdateForm'
import { BaseButton } from '@/components/uiParts/BaseButton'
import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import { useNotification } from '@/components/uiParts/TheNotificationToast/hooks'
import dayjs from '@/libs/importDayjs'
import getBackendAPIServiceClient from '@/libs/APIServiceClient/BackendAPIServiceClient'
import { useToken } from '@/hooks/useAccessToken'
import { BookUpdateRequest } from '@/types/request/BookUpdateRequest'
import { KeyedMutator } from 'swr'

type Props = {
  open: boolean
  setOpen: (value: boolean) => void
  book?: ClientBook
  mutate: KeyedMutator<BooksResponse>
}

const BookUpdateDrawer: FC<Props> = ({ open, setOpen, book, mutate }) => {
  const { showLoading, hideLoading } = useLoading()
  const { showSuccess, showError } = useNotification()
  const { token } = useToken()
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { isValid },
    reset,
  } = useForm<IBookUpdateForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })
  useEffect(() => {
    if (book) {
      setValue('comment', book.comment || '')
      setValue('status', book.status)
      setValue('completedAt', dayjs(book?.completedAt).toDate())
    }
  }, [book])

  if (!book) return <></>
  const close = () => {
    reset()
    setOpen(false)
  }
  const update = async (form: IBookUpdateForm) => {
    try {
      showLoading()
      const req = {
        ...form,
        completedAt: form.status === BOOK_STATUS[3] ? dayjs(form.completedAt).toISOString() : null,
      }
      await getBackendAPIServiceClient(token).put<BookUpdateRequest, any>(`/books/${book.id}`, req)
      showSuccess('更新しました')
      mutate()
      close()
      reset()
    } catch (err) {
      console.error(err)
      showError('エラー')
    } finally {
      hideLoading()
    }
  }
  return (
    <>
      <SwipeableDrawer anchor='bottom' open={open} onOpen={() => setOpen(true)} onClose={close}>
        <Box sx={{ p: 1 }}>
          <BookCard book={book} />
          <form onSubmit={handleSubmit(update)}>
            <Box sx={{ p: 1, mt: 2 }}>
              <BookUpdateForm control={control} watch={watch} setValue={setValue}></BookUpdateForm>
            </Box>
            <Grid container>
              <Grid item xs={6} sx={{ textAlign: 'left' }}>
                <Button disableElevation onClick={close}>
                  閉じる
                </Button>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'right' }}>
                <BaseButton submit={true} color='secondary' disabled={!isValid}>
                  更新
                </BaseButton>
              </Grid>
            </Grid>
          </form>
        </Box>
      </SwipeableDrawer>
    </>
  )
}

export default BookUpdateDrawer
